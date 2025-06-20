FROM node:16-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000

# Expose the port
EXPOSE 4000

# Start the app
CMD ["node", "src/app.js"]