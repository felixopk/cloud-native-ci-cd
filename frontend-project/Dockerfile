# Step 1: Build the React app
FROM node:18 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Serve the app using a tiny Node.js server
FROM node:18-slim

# Only copy the build output and install 'serve'
WORKDIR /app

RUN npm install -g serve

# Copy only the build folder from the builder stage
COPY --from=builder /app/build ./build

# Expose port 3000 inside container
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "3000"]
