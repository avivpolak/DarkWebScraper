# STAGE 1
FROM node:14-alpine as builder
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install -g typescript
RUN npm install -g ts-node
USER node
RUN npm install
COPY --chown=node:node . .
RUN cd src && npx prisma migrate deploy --name init
RUN npm run scrap


EXPOSE 3000
CMD [ "node", "dist/api/index.js" ]