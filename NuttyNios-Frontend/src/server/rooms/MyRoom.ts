import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import WebSocket from 'ws';
export class MyRoom extends Room {
    ws: WebSocket;

    // https://developers.refinitiv.com/en/article-catalog/article/how-to-implement-elektron-websocket-api-javascript-application-typescript
    onCreate (options: any){
        console.log("onCreate executed")
        this.setState(new MyRoomState());
        this.ws = new WebSocket("ws://192.168.1.192:18000/ws/node/admin/data/button");
        this.ws.onopen = this._onOpen;
        this.ws.onclose = this._onClose;
        this.ws.onerror = this._onError;
        this.ws.onmessage = this._onMQTTMessage;

        this.onMessage('type', (client, message) => {
        })
    }
    
    //indicates that the connection is ready to send and receive data
    _onOpen(event: any): void {
        console.log("connected");
    //$("#btnConnect").html("Connected");
        // btnConnect.innerHTML = "Connected";
    }
    //An event listener to be called when a message is received from the server
    _onMQTTMessage(event: any): void {
        console.log("message received");
    }
    //An event listener to be called when an error occurs. This is a simple event named "error".
    _onError(event: any): void {
        console.log("onError");
        // console.log(JSON.stringify(event.data));
    }
    //An event listener to be called when the WebSocket connection's readyState changes to CLOSED.
    _onClose(event: any): void {
        console.log("onClose");
        // console.log(JSON.stringify(event.data));
    }

    onJoin (client: Client, options: any) {
    }

    onLeave(client: Client, consented: boolean) { 
    }

    onDispose() {
    }
}
