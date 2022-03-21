import { Collection } from "mongodb";
import { Db } from "mongodb";
import * as dotenv from "dotenv";
const MongoClient = require( 'mongodb' ).MongoClient;

export const collections: { games?: Collection } = {}

export async function connectToDatabase () {
    dotenv.config();
 
    const client = new MongoClient(process.env.DB_CONN_STRING);
            
    await client.connect();
        
    const db: Db = client.db(process.env.DB_NAME);
   
    const gamesCollection: Collection = db.collection(process.env.GAMES_COLLECTION_NAME);
 
    collections.games = gamesCollection;
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);
 }