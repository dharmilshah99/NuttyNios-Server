import autoBind from 'auto-bind';

export default class WebSocketHandler
{
    constructor(port, num, topicName){
        this.nodeNum = num
        this.topic = topicName
        this.IP = "52.5.188.233"
		this.port = port
		var websocketURL = "ws://" + this.IP + ":" + this.port + "/ws/node/" + this.nodeNum + "/data/" + this.topic
		this.ws = new WebSocket(websocketURL);
		this.ws.onopen = this._onOpen;
		this.ws.onclose = this._onClose;
		this.ws.onerror = this._onError;
		this.ws.onmessage = this._onMQTTMessage;
        autoBind(this);
	}

    // indicates that the connection is ready to send and receive data
    _onOpen(event) {
        console.log("connected");
    }

    // An event listener to be called when a message is received from the server
    _onMQTTMessage(event){
        console.log("message received");
        this.incomingdata = JSON.parse(event.data.toString());
        console.log(JSON.stringify(this.incomingdata))
    }
    
    // An event listener to be called when an error occurs. This is a simple event named "error".
    _onError(event){
        console.log("onError");
        console.log(JSON.stringify(event.data));
    }
    
    // An event listener to be called when the WebSocket connection's readyState changes to CLOSED.
    _onClose(event){
		console.log("onClose");
        console.log(JSON.stringify(event.data));
    }

    // used by client to get message in game.js
    getMessage(){
        return this.ws.incomingdata
    }
}