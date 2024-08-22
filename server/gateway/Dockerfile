# Use an appropriate base image for your API Gateway
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the necessary files
COPY . .

# Install dependencies
RUN npm install

# Expose the port the gateway will run on
EXPOSE 8080

# Command to run the gateway
CMD ["node", "server.js"]
