FROM node:14-alpine 


# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose the port that the app runs on
ENV REACT_APP_API_URL http://localhost:8000

EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]

