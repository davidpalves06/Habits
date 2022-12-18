FROM node:19-alpine3.17
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
