FROM node:12

WORKDIR /usr/usr/todoserver

COPY package*.json ./

RUN npm install

RUN npm install nodemon

COPY . .

ENV NODE_ENV="production"

EXPOSE 4000

CMD ["npm", "start"]