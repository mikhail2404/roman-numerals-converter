FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
COPY . .
RUN yarn install
RUN yarn build
EXPOSE 5173
COPY wait-for-backend.sh ./
RUN chmod +x wait-for-backend.sh
CMD ["./wait-for-backend.sh", "yarn", "preview", "--host"] 