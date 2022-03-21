import { ObjectId } from "mongodb";

export default class GameDB {
    constructor(public name: string, public score: number, public rank: number, public id?: ObjectId) {}
}