FROM node:18
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon ts-node
COPY . .
EXPOSE 3333
CMD ["npm", "run", "start"]