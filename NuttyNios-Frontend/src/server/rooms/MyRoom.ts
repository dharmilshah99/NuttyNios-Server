import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";

export class MyRoom extends Room {
    onCreate (options: any){
        console.log("onCreate executed")
        this.setState(new MyRoomState());

        this.onMessage('', (client, message) => {
        })
    }
    
    
    onJoin (client: Client, options: any) {
        // boiler plate code for sending message from server to client. TODO: remove if not needed
        // client.send("direction", {type: "ammo"});
    }

    onLeave(client: Client, consented: boolean) { 
    }

    onDispose() {
    }
}
