FROM node:14

LABEL maintainer="Tiago Sansão"

WORKDIR /app

RUN npm install yarn
COPY package.json /app
RUN yarn global add serve
RUN yarn
COPY . /app
RUN yarn run build

CMD serve -l 5556 -s build 

EXPOSE 5556