FROM node:latest

WORKDIR /app

COPY package*.json package-lock.json ./

RUN npm install

ARG API_URL

ENV API_URL=${API_URL}

ARG APP_SECRET_KEY

ENV APP_SECRET_KEY=${APP_SECRET_KEY}

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]