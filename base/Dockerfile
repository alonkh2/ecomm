FROM node:22

WORKDIR /base

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build