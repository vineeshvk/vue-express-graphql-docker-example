#Stage 1
FROM node:alpine as vue

WORKDIR /usr/src/app
COPY vue/package*.json ./

RUN npm install
COPY vue ./

RUN npm run build


#Stage 2
FROM node:alpine as builder

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY --from=vue /usr/src/app/dist ./dist
COPY .dockerignore index.ts tsconfig.json Dockerfile ./

RUN npm run build


#Stage 3
FROM node:alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --production

COPY --from=vue /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/build ./

EXPOSE 3000

CMD node index.js