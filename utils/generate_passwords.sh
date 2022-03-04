#!/bin/bash

DEFAULT_DIR="../mosquitto/config"
PASSWORD_FILE_PATH=${1}
DIR=${2:-$DEFAULT_DIR}

# Check passwords file name
if [ ! -f "$(dirname PASSWORD_FILE_PATH)/passwords.txt" ]; then
    echo "Incorrect file name!"
    exit 1
fi

# Generate
mosquitto_passwd -U $PASSWORD_FILE_PATH
mv $PASSWORD_FILE_PATH $DEFAULT_DIR
