FROM node:14-alpine

WORKDIR /server

COPY ./server/package.json /server/package.json
COPY ./server /server

RUN npm i
CMD ["npm", "run", "start"]