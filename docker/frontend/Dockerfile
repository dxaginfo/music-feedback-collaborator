FROM node:16-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Build the app
RUN npm run build

# Install serve to run the application
RUN npm install -g serve

# Expose the port
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]