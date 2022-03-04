#!/bin/bash

DEFAULT_BRIDGE_DIR="../mosquitto-bridge/config/certs/"
DEFAULT_BROKER_DIR="../mosquitto/config/certs/"

COMMON_NAME=${1}
BROKER_DIR=${2:-$DEFAULT_BROKER_DIR}
BRIDGE_DIR=${2:-$DEFAULT_BRIDGE_DIR}

SUBJECT_BRIDGE="/C=UK/ST=London/L=London/O=ICL/OU=Bridge/CN=$COMMON_NAME"

# Check if bridge directory exists
if [ -d $BRIDGE_DIR ]
then
    sudo rm -rf "${BRIDGE_DIR}/*"
else
    sudo mkdir $BRIDGE_DIR
fi

# Copy CA
cp "${BROKER_DIR}/ca.crt" "${BRIDGE_DIR}/ca.crt"

# Create keys
openssl genrsa -out "${BRIDGE_DIR}/bridge.key" 2048
openssl req -new -subj "$SUBJECT_BRIDGE" -out "${BRIDGE_DIR}/bridge.csr" -key "${BRIDGE_DIR}/bridge.key"
openssl x509 -req -in "${BRIDGE_DIR}/bridge.csr" -CA "${BROKER_DIR}/ca.crt" -CAkey "${BROKER_DIR}/ca.key" -CAcreateserial -out "${BRIDGE_DIR}/bridge.crt" -days 720
