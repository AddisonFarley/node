FROM node:22

WORKDIR /node

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 4242

CMD ["node", "api.js"]
