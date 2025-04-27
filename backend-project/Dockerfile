# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the backend source code
COPY . .

# Expose the backend port (adjust if necessary)
EXPOSE 5000

# Start the backend server
CMD node index.js  # Change this if your entry file is different
