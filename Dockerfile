FROM node:12.18.0

WORKDIR /home/senswap-api

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 443
CMD [ "npm", "run", "__ENV__" ]
