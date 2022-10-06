# NuttyNios-Server

A Docker Swarm that listens to the directions published by `NuttyNios-Client` and computes the next state of the game.

## Components
The server is composed of the following services, 
- MQTT Broker: A server that receives and distributes messages to authenticated clients over an MQTT protocol
- MQTT Bridge: It's connected to the MQTT broker and allows unrestricted access to it for services within the Docker Swarm.
- Colyseus Server: Computes the next state of the game depending on direction messages published to the MQTT broker. It also handles multiple client connections to the game.
- Phaser Frontend: Service listens to the Colyseus server for changes in the game's state and updates the frontend accordingly.
- MongoDB: A no SQL database that stores the leaderboard after each game.
- FastAPI Service: This service exposes endpoints to update and fetches records stored in the database.

## Performance
- The RTT for the transer of packets between the gateway to the server was meatured to be 197.8ms. This is the bottleneck of the system.
    - The latency can be attributed to the large geographical distance rom the gateway to the AWS EC2 instance the server was hosted on - US.
