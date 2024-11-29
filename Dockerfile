# Stage 1: Build the Angular application
FROM node:20-alpine AS builder

# Set working directory for the build process
WORKDIR /app

# Copy necessary files for building the app
COPY package.json . 
# COPY package-lock.json . 

# Install dependencies
RUN npm install

# Copy the rest of the Angular app code
COPY . .

# # Create the environment.ts dynamically based on environment variables (using ARG or ENV)
# # We will use ENV for this purpose to inject Cognito values during the Docker build process
# ARG CLIENT_ID
# ARG AUTHORITY
# ARG DOMAIN

# # Generate the environment.ts file dynamically during build
# RUN echo "export const environment = {" > src/environments/environment.ts && \
#     echo "  production: false," >> src/environments/environment.ts && \
#     echo "  CLIENT_ID: \"$CLIENT_ID\"," >> src/environments/environment.ts && \
#     echo "  AUTHORITY: \"$AUTHORITY\"," >> src/environments/environment.ts && \
#     echo "  DOMAIN: \"$DOMAIN\"" >> src/environments/environment.ts && \
#     echo "};" >> src/environments/environment.ts

# Run the Angular build (optional if you want to build ahead of time)
# RUN npm run build --prod

# Expose the port for the Angular app
EXPOSE 4200

ENV HOST=0.0.0.0

# Stage 2: Serve the Angular application
CMD ["npm", "start"]
