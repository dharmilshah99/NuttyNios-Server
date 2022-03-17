import { Schema, type, MapSchema } from "@colyseus/schema";
export class MyRoomState extends Schema {

    @type("boolean")
    running: boolean;

    @type("number")
    timeLeft: number; // in sec

    @type({ map: "number" }) 
    // key is playerNum, value is score
    playerScores = new MapSchema<number>(); 

    @type({ map: "string" }) 
    // key is rank, value is playerNum
    playerRank = new MapSchema<string>(); 

}