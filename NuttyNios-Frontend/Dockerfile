FROM node:17

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 10000
EXPOSE 2567

RUN npm run start-server
CMD [ "npm", "run", "start" ]