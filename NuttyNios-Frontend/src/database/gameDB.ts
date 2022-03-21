const ObjectId = require( 'mongodb' ).ObjectId;

export default class GameDB {
    constructor(public gameID: ObjectId, public playerNum: number, public score: number, public id?: ObjectId) {}
}