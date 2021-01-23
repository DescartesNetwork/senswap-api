FROM node:12.18.0

WORKDIR /home/senswap-api

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 80
CMD [ "npm", "run", "prod" ]
