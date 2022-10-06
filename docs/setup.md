## Set-Up
1. Create "passwords.txt" under file utils with format username:password
2. Enter Terminal, cd into utils run "./generate_passwords.sh passwords.txt"
3. Script takes in input of passwords.txt file created and creates a "password.txt" file under mosquitto\config
4. Run "sudo ./generate_broker_certs.sh localhost" (localhost or ip you want to host broker at)
5. Run "sudo ./generate_bridge_certs.sh localhost" (localhost or ip you want to host bridge at)
6. Go to certs folder under mosquitto\config and copy "ca.crt" and "ca.key" into NuttyNios-Client>certs>server-certs
7. Make sure you are in the file path NuttyNios-Client/utils in the terminal and run "./clientcerts.sh"

Get all 3 services running
1. Make sure you are in the file path NuttyNios-Server run "sudo docker-compose up"
2. The mosquitto service is now hosted on the docker container to start your communication
