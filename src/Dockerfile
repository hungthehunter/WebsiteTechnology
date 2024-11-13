FROM node:20.17-alpine3.20

# COPY [host machine] [container] (first path is relative to the Dockerfile , second is relative to root to container)
COPY package.json package-lock.json .

RUN npm install

COPY . . 

RUN npm build