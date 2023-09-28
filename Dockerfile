# Use an official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the required npm packages
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Specify the command to run when the container starts
CMD ["npm", "start"]
