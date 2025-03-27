# Use official Node.js image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Compile TypeScript (if applicable)
RUN npm run build

# Expose port (default for many Node.js apps)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
