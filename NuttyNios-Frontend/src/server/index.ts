import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";

import { MyRoom } from "./rooms/MyRoom";

import { connectToDatabase } from "../database/DB.service";
import { gamesRouter } from "../database/DB.router";

const port = Number(process.env.PORT || 25670);
const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const gameServer = new Server({
    server,
});

gameServer.define('my_room', MyRoom);

app.use("/colyseus", monitor());

gameServer.listen(port);
var host = 'localhost';
console.log('Listening on ws://' + host+':'+port)

connectToDatabase()
    .then(() => {
        app.use("/database", gamesRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
