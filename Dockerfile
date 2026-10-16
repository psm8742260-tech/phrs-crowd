FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
ENV PORT=8080
RUN npm run build

EXPOSE 8080 3000
CMD [ "npm", "start" ]
