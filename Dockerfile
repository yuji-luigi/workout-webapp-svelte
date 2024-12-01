# Base image for Node.js
FROM node:22-alpine

# Set working directory
WORKDIR /app


# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm -g pnpm install

RUN pnpm install

# Copy the rest of the application
COPY . .

# Build the app for production
RUN npm run build

# Install only production dependencies
RUN npm prune --production

# Expose the port the app will run on
EXPOSE 3000

# Start the production server
CMD ["node", "build"]