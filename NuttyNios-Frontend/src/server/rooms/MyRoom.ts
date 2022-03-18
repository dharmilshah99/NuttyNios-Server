import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import { Player } from "../utils/player";
import { MQTTHandler } from "../utils/mqtthandler";

export class MyRoom extends Room<MyRoomState>{
    private playerMap: Map<string, Player>;
    private readyState: boolean;
    private gameSessionDuration: number = 20;
    private MQTTClient: MQTTHandler;

    constructor() {
        super();
        this.playerMap = new Map<string, Player>();
        this.readyState = false;
        this.MQTTClient = new MQTTHandler("mosquitto-bridge",1883);

        /* DEBUGGING */
        // console.log("attempting to connect MQTT-game-server")
        // this.MQTTClient._subscribe("node/0/data/score");
        // this.MQTTClient._subscribe("node/1/data/score");
        // this.MQTTClient._subscribe("node/2/data/score");
        // this.MQTTClient._subscribe("node/3/data/score");
        // this.MQTTClient._subscribe("game/data/difficulty");
    }

    private allPlayersReady(): boolean {
        for (const player of this.playerMap.values()) {
            if (!player.isReady) {
                return false;
            }
        }
        return true;
    }

    private resetGame() {
        this.state.running = false;
        this.readyState = false;
        this.state.playerScores.clear();
        for (const player of this.playerMap.values()) {
            player.isReady = false;
        }
    }

    private updateRank() {
        let playerScoresArray: number[] = []

        this.state.playerScores.forEach((value, key) => {
            playerScoresArray.push(value)
        });

        console.log(playerScoresArray)
        playerScoresArray.sort((a, b) => 0 - (a > b ? 1 : -1));
        console.log(playerScoresArray)

        let playerScoresCopy = this.state.playerScores.clone();
        for (let i = 1; i <= playerScoresArray.length; i++) {
            let score: number = playerScoresArray[i - 1];
            let found: boolean = false;

            playerScoresCopy.forEach((value, key) => {
                if (value == score && !found) {
                    this.state.playerRank.set(i.toString(), key);
                    playerScoresCopy.delete(key);
                    found = true;
                }
            });
        }
    }

    private publishScores(){
        this.state.playerScores.forEach((value, key) => {
            var nodeNum = parseInt(key) - 1;
            var topic = "node/"+nodeNum.toString()+"/data/score"
            this.MQTTClient._publish(topic, value.toString())
        });
    }

    onCreate(options: any) {
        console.log("onCreate executed")
        this.setState(new MyRoomState());

        this.onMessage("ready", (client, message) => {
            if (this.playerMap.has(client.id)) {
                this.playerMap.get(client.id).isReady = true;
                console.log(client.id + "is ready")
                this.state.playerScores.set(this.playerMap.get(client.id).getPlayerNum.toString(), 0);
            }

            if (this.allPlayersReady()) {
                console.log("all players ready")
                this.readyState = true
                // this.state.playerRank.set("1", "1")
            }
            else {
                this.readyState = false
            }
        });

        this.onMessage("playerIdent", (client, message) => {
            this.playerMap.get(client.id).setPlayerNum = message;
        });

        this.onMessage("score", (client, message) => {
            let playerNum = this.playerMap.get(client.id).getPlayerNum;
            let playerNumString = playerNum.toString();
            let prevScore = this.state.playerScores.get(playerNumString);
            this.state.playerScores.set(playerNumString, prevScore + message);
            this.updateRank();
            console.log(this.state.playerRank.get("4"))
        });

        this.onMessage("start-attempt", (client, message) => {
            console.log("start-attempt")
            if (this.readyState) {
                console.log("start-successful")
                this.broadcast("start-game", 1)
                this.state.running = true;
                // start the clock ticking
                this.clock.start();
                this.state.timeLeft = this.gameSessionDuration;

                // Set an interval and store a reference to it
                // so that we may clear it later
                this.clock.setInterval(() => {
                    if (this.state.timeLeft > 0) {
                        this.state.timeLeft -= 1;
                        console.log("Time now " + this.state.timeLeft);
                    }
                    else {
                        this.broadcast("end-game", 1)
                        this.clock.clear();
                        this.clock.stop();

                        this.publishScores();
                    }
                }, 1000);
            }
        });

        this.onMessage("restart", (client, message) => {
            this.broadcast("new-game", 1);
            this.resetGame();
        });

        this.onMessage("difficulty", (client, message) => {
            this.MQTTClient._publish("game/data/difficulty", message)
        });
    }


    onJoin(client: Client, options: any) {
        this.playerMap.set(client.id, new Player(client.id, false));
        console.log(client.id + " Player created")
    }

    onLeave(client: Client, consented: boolean) {
        this.playerMap.delete(client.id);
    }

    onDispose() {
    }
}
