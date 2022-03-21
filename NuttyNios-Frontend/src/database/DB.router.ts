import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "./DB.service"
import GameDB from "./gameDB";

export const gamesRouter = express.Router();

gamesRouter.use(express.json());

gamesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newGame = req.body as GameDB;
        const result = await collections.games.insertOne(newGame);

        result
            ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});