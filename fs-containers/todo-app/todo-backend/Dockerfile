FROM node:24
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENV DEBUG=todo-express-backend:*

CMD ["npm", "start"]