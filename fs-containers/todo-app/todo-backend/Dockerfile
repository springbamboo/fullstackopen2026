FROM node:24
WORKDIR /usr/src/app
COPY . .
RUN npm ci --omit=dev
ENV DEBUG=todo-express-backend:*

CMD ["npm", "start"]