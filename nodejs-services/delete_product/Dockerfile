# Base image
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if exists)
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the port the app listens on
EXPOSE 5001

# Command to start the app
CMD ["node", "app.js"]
