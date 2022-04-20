FROM node:alpine as builder

WORKDIR /usr/app
COPY ./ /usr/app
RUN ls
RUN npm install

COPY ./ ./

RUN CI= npm run build

CMD ["npm", "start"]