# Base image
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["node", "app.js"]
