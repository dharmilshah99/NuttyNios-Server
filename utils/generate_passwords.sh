#!/bin/bash

DEFAULT_DIR="../mosquitto/config"
PASSWORD_FILE_PATH=${1}
DIR=${2:-$DEFAULT_DIR}

# Generate
mosquitto_passwd -U $PASSWORD_FILE_PATH
mv $PASSWORD_FILE_PATH $DEFAULT_DIR
