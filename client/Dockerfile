# Get node
FROM node:20-alpine
WORKDIR /app

# Leverage caching by installing dependencies first
COPY package.json ./
RUN npm install --frozen-lockfile

# Copy the full source code
COPY . ./

# Expose port for the development server
EXPOSE 3000

# Start the application
CMD ["npm","run","dev"]
