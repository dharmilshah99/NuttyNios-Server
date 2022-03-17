import * as mqtt from "mqtt"

export class MQTTHandler {
    private client: mqtt.MqttClient
    private hostname: string
    private port: number
    
    constructor(hostname:string, port:number) {
        this.port = port;
        this.hostname = hostname;
        this.client = mqtt.connect('mqtt://'+this.hostname+":"+port.toString());
        
        this.client.on('connect', function(this: any){
            console.log('game-server connected to mqtt');
        });
        
        this.client.on('message', function(topic: string, message:any){
            console.log("Received message from: " + topic + " "+ message.toString());
        });
    }

    _subscribe(topic: string){
        this.client.subscribe(topic)
    }

    _publish(topic: string, message: string){
        this.client.publish(topic, message)
    }


}