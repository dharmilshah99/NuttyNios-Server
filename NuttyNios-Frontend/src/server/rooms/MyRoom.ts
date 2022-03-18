import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import { Player } from "../utils/player";
import * as mqtt from "mqtt"

export class MyRoom extends Room<MyRoomState>{
    private playerMap: Map<string, Player>;
    private readyState: boolean;
    private gameSessionDuration: number = 20;
    private MQTTClient: mqtt.Client;
    private hostname: string = "mosquitto-bridge";
    private port: number = 1883;

    constructor() {
        super();
        this.playerMap = new Map<string, Player>();
        this.readyState = false;

        
        /* =========== MQTT =========== */
        this.MQTTClient = mqtt.connect('mqtt://'+this.hostname+":"+this.port.toString());

        this.MQTTClient.subscribe("node/0/data/direction")
        this.MQTTClient.subscribe("node/1/data/direction")
        this.MQTTClient.subscribe("node/2/data/direction")
        this.MQTTClient.subscribe("node/3/data/direction")

        /* =========== Callbacks =========== */
        this.MQTTClient.on('connect', function(this: any){
            console.log('game-server connected to mqtt');
        });
        this.MQTTClient.on('error', function(){
            console.log("Error connecting to MQTT Bridge");
        });

        this.MQTTClient.on('message', function(this:MyRoom, topic: string, message:any){
            console.log("Received message from: " + topic + " "+ message.toString());

            if(topic == "node/0/data/direction"){
                this.messageHandler(1,message);
            }
            else if(topic == "node/1/data/direction"){
                this.messageHandler(2,message);
            }
            else if(topic == "node/2/data/direction"){
                this.messageHandler(3,message);
            }
            else if(topic == "node/3/data/direction"){
                this.messageHandler(4,message);
            }
        }.bind(this));

        /* DEBUGGING */
        console.log("attempting to connect MQTT-game-server")
        this.MQTTClient.subscribe("node/0/data/score");
        this.MQTTClient.subscribe("node/1/data/score");
        this.MQTTClient.subscribe("node/2/data/score");
        this.MQTTClient.subscribe("node/3/data/score");
        this.MQTTClient.subscribe("game/data/difficulty");
    }

    private messageHandler(playerNum:number, message:any){

        // reset state of input
        var directionInput = {
            up: false,
            left: false,
            right: false,
            down: false
        }

        var directionInputList = JSON.parse(message.toString()).directions_moved
        for (let i = 0; i < directionInputList.length; i++) {
            switch (directionInputList[i]) {
                case 0:
                    directionInput.up = true
                    break;
                case 1:
                    directionInput.up = true
                    break;
                case 2:
                    directionInput.left = true
                    break;
                case 3:
                    directionInput.right = true
                    break;
            }
        }

        this.clients.forEach(function (client) {
            if(client.userData !== undefined){
                if(client.userData.playerNumber == playerNum){
                    client.send("direction-input", directionInput)
                }
            }
          }); 
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

    private publishScores() {
        this.state.playerScores.forEach((value, key) => {
            var nodeNum = parseInt(key) - 1;
            var topic = "node/" + nodeNum.toString() + "/data/score"
            this.MQTTClient.publish(topic, value.toString())
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
                client.userData = { playerNumber: this.playerMap.get(client.id).getPlayerNum };
            }

            if (this.allPlayersReady()) {
                console.log("all players ready")
                this.readyState = true
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
        });

        this.onMessage("start-attempt", (client, message) => {
            console.log("start-attempt")
            if (this.readyState) {
                console.log("start-successful")
                this.broadcast("start-game", 1)
                this.state.running = true;
                this.clock.start();
                this.state.timeLeft = this.gameSessionDuration;

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
            console.log("difficulty " + message + " selected")
            this.MQTTClient.publish("game/data/difficulty", message)
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
