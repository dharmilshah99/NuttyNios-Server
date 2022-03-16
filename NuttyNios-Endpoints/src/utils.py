import time
from fastapi import WebSocket
from typing import List
from pydantic import BaseModel
from pymongo import MongoClient


###
# Models
###

class BoardConfiguration(BaseModel):
    node_name: str
    display_text: str
    up_threshold: int
    down_threshold: int
    left_threshold: int
    right_threshold: int


###
# Helpers
###

class MongoDB:
    """Handles MongoDB Connections"""
    def __init__(self, ip: str, port: int):
        self.ip = ip
        self.port = port

    def __enter__(self):
        self.client = MongoClient(self.ip, self.port)
        return self.client

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.client.close()
        del self.client

class MQTT(object):
    def __init__(self, client, hostname, port, topic):
        """Initialize class."""
        self.client = client
        self.topic = topic
        self.hostname, self.port = hostname, port

    def on_connect(self, client, userdata, flags, rc):
        """Subscribe to topic."""
        # TODO: Check why self.client doesn't work.
        # TODO: Insert is_connected flag here.
        client.subscribe(self.topic)

    def on_message(self, client, userdata, msg):
        """Put message in buffer."""
        self.message_buffer.append(msg.payload)

    def start(self):
        "Connect and read latest message."
        is_connected = False
        while not is_connected:
            try:
                self.client.on_connect = self.on_connect
                self.client.on_message = self.on_message
                self.client.connect(self.hostname, self.port)
                is_connected = True
                self.client.loop_start()
            except:
                time.sleep(5)
        self.message_buffer = []

    def get_message(self):
        """Return first message from message buffer."""
        if len(self.message_buffer) > 0:
            message = self.message_buffer.pop(0)
            return message
        else:
            return None


class ConnectionManager:
    """Manages active sockets.
    Taken from FastAPI Docs: https://fastapi.tiangolo.com/advanced/websockets/
    """

    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        """Add websocket to active connections"""
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        """Remove websocket from active connections"""
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        """Send message to all other websockets"""
        for connection in self.active_connections:
            await connection.send_text(message)
