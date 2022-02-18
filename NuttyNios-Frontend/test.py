import time
import paho.mqtt.client as paho

from utils import MQTT

###
# Global Variables
###

MQTT_CLIENT = paho.Client("digi_mqtt_test1")
HOSTNAME = "127.0.0.1"
PORT = 1883

###
# Main
###

if __name__ == "__main__":
    MQTTClient = MQTT(client=MQTT_CLIENT, hostname=HOSTNAME,
                      port=PORT, topic="node/data")
    MQTTClient.start()
    while True:
        message = MQTTClient.get_message()
        if message is not None:
            print(message)
        time.sleep(1)
