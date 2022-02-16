# STAGE 1
FROM node:14-alpine as builder
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm config set unsafe-perm true
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm i -S validator
USER node
RUN npm install
COPY --chown=node:node . .
RUN npm run build

# STAGE 2
FROM node:14-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
# RUN npm install --save-dev sequelize-cli
RUN npm install --production
COPY --from=builder /home/node/app/build ./build

COPY --chown=node:node .env .
# COPY --chown=node:node .sequelizerc .
COPY --chown=node:node  /src ./src
COPY --chown=node:node  /configs ./configs


# RUN npm run migrate
RUN npx prisma migrate reset
RUN npx prisma migrate dev --name init
# RUN npm un sequelize-cli

EXPOSE 2700
CMD [ "node", "dist/webScraper/index.js" ]