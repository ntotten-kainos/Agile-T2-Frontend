FROM node:18

WORKDIR /home/node/app

COPY package*.json ./

ARG API_URL
ARG SESSION_SECRET

ENV API_URL ${API_URL}
ENV SESSION_SECRET=${SESSION_SECRET}

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]