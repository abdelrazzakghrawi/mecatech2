# Use a Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application using Vite
RUN npm run build

# Install serve to serve the build
RUN npm install -g serve

# Expose the port on which the server will run
EXPOSE 5173

# Command to run the application
CMD ["serve", "-s", "dist", "-l", "5173"]
