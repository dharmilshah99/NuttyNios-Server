FROM node:17

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 10000

CMD [ "npm", "run", "start" ]