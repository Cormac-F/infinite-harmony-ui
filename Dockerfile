FROM node:latest

WORKDIR /app

COPY package*.json package-lock.json ./

ARG API_URL

ENV API_URL ${API_URL}

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
