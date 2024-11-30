FROM alon-base

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN echo $USER_PORT > temp.txt

EXPOSE 5005
CMD [ "npm", "start" ]