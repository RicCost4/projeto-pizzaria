FROM node:18
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
RUN npm install -g next
# RUN npm i sass
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]