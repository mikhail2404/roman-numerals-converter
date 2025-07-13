FROM node:20
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY . .
RUN yarn install
RUN yarn build
EXPOSE 3001
CMD ["yarn", "start"] 