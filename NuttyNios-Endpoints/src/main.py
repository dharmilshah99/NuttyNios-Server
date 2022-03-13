import json
from fastapi import FastAPI, WebSocketDisconnect, WebSocket
import paho.mqtt.client as paho
from fastapi.responses import HTMLResponse

from src.utils import *

###
# Global Variable
###

MQTT_CLIENT = paho.Client("NuttyNios-Endpoints")
HOSTNAME = "mosquitto-bridge"
PORT = 1883

Manager = ConnectionManager()

###
# Debugging
###

html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            var ws = new WebSocket("ws://localhost:18000/ws/node/admin/data/button");
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""


###
# App
###

app = FastAPI(
    title="NuttyNios Data Server",
    description="Server that republishes data sent to the MQTT bridge"
)

# TODO: Remove after debug


@app.get("/")
async def get():
    return HTMLResponse(html)


@app.websocket("/ws/node/{node_name}/data/{data_topic}")
async def get_datastream(websocket: WebSocket, node_name: str, data_topic: str):
    await Manager.connect(websocket)
    # Initialize Client
    MQTTClient = MQTT(client=MQTT_CLIENT, hostname=HOSTNAME,
                      port=PORT, topic=f"node/{node_name}/data/{data_topic}")
    MQTTClient.start()
    # Accept Websocket and Publish
    try:
        while True:
            payload = MQTTClient.get_message()
            if payload is not None:
                await websocket.send_json(json.loads(payload))
    except WebSocketDisconnect:
        Manager.disconnect(websocket)
        # TODO: Broadcast disconnections?
