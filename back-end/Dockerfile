FROM node:14

LABEL maintainer="Tiago Sansão"

WORKDIR /app

RUN npm install yarn
COPY package.json /app
RUN yarn
COPY . /app

CMD yarn run start

EXPOSE 5555