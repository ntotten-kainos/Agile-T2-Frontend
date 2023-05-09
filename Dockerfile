FROM node:11.9.0

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

ARG API_URL

ENV API_URL ${API_URL}

RUN npm install --production

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "start.js" ]