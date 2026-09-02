FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build the app for production
RUN npm run build

# Expose port (Cloud Run sets process.env.PORT, usually 8080)
EXPOSE 8080 3000

# Start the application
CMD [ "npm", "start" ]
