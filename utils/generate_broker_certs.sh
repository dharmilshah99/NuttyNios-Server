#!/bin/bash

IP=${1}
DEFAULT_DIR="../mosquitto/config/certs/"
DIR=${2:-$DEFAULT_DIR}
SUBJECT_CA="/C=UK/ST=London/L=London/O=ICL/OU=CA/CN=$IP"
SUBJECT_SERVER="/C=UK/ST=London/L=London/O=ICL/OU=Server/CN=$IP"

# Check if Directory exists
if [ -d $DIR ]
then
    sudo rm -rf "${DIR}/*"
else
    sudo mkdir $DIR
fi

# Generate CA
openssl genrsa -out "${DIR}/ca.key" 2048
openssl req -new -x509 -subj "$SUBJECT_CA" -days 3650 -key "${DIR}/ca.key" -out "${DIR}/ca.crt"

# Generate Server
openssl genrsa -out "${DIR}/server.key" 2048
openssl req -new -subj "$SUBJECT_SERVER" -out "${DIR}/server.csr" -key "${DIR}/server.key"
openssl x509 -req -in "${DIR}/server.csr" -CA "${DIR}/ca.crt" -CAkey "${DIR}/ca.key" -CAcreateserial -out "${DIR}/server.crt" -days 720
