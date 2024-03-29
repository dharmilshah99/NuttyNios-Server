import json
import paho.mqtt.client as paho
from fastapi.responses import HTMLResponse
from fastapi import FastAPI, WebSocketDisconnect, WebSocket
import random

from src.utils import *

###
# Global Variable
###

uniqueID = random.randint(0,9999)

MQTT_CLIENT = paho.Client("NuttyNios-Endpoints" + str(uniqueID))
HOSTNAME = "mosquitto-bridge"
PORT = 1883

MONGO_HOSTNAME = "nuttynios-mongodb"
MONGO_PORT = 27017

###
# App
###

app = FastAPI(
    title="NuttyNios Data Server",
    description="Websocket and HTTP Request Server"
)

tags_metadata = [
    {
        "name": "Database Endpoints",
        "description": "Endpoints that talk to the database.",
    },
]


# HTTP Endpoints
@app.get("/node/{node_name}/configuration", tags=["Database Endpoints"], response_model=BoardConfiguration)
async def get_node_configuration(node_name: str):
    try:
        with MongoDB(MONGO_HOSTNAME, MONGO_PORT) as mongo_client:
            db = mongo_client["node"]
            coll = db["configurations"]
            res = coll.find_one({"node_name": node_name})
    except ConnectionError as e:
        raise ConnectionError("Could not connect to DB")
    return res


@app.post("/node/{node_name}/configuration", status_code=201, tags=["Database Endpoints"])
async def post_node_configuration(node_name: str, config_data: BoardConfiguration):
    try:
        with MongoDB(MONGO_HOSTNAME, MONGO_PORT) as mongo_client:
            db = mongo_client["node"]
            coll = db["configurations"]
            coll.insert_one(config_data.dict())
    except ConnectionError as e:
        raise ConnectionError("Could not connect to DB")
