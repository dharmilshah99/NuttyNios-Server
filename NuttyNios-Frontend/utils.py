import time
import paho.mqtt.client as paho


class MQTT(object):
    def __init__(self, client, hostname, port, topic):
        """Initialize class."""
        self.client = client
        self.topic = topic
        self.hostname, self.port = hostname, port

    def on_connect(self, client, userdata, flags, rc):
        """Subscribe to topic."""
        # TODO: Check why self.client doesn't work.
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
