FROM node:16

WORKDIR /app

COPY package.json /app

RUN npm install

#RUN npm install -g ts-node

COPY . /app

EXPOSE 8000

CMD ["npm", "start"]
