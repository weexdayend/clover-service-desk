# Use node lts-buster-slim as base image
FROM node:lts-buster-slim AS base

# Install necessary dependencies
RUN apt-get update && apt-get install -y libssl-dev ca-certificates

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock from local directory to WORKDIR
COPY package.json package-lock.json ./

# Install dependencies for the base stage
RUN npm install --production

# Use base stage as build stage
FROM base as build

# Copy all local files to WORKDIR
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Use base stage as production build stage
FROM base as prod-build

# Install production dependencies for production build stage
RUN npm install --production

# Copy Prisma directory to WORKDIR
COPY prisma prisma

# Generate Prisma client for production build stage
RUN npx prisma generate

# Create a directory to store production node modules
RUN cp -R node_modules prod_node_modules

# Use base stage as prod stage
FROM base as prod

# Copy production node modules from prod-build stage to prod stage
COPY --from=prod-build /app/prod_node_modules /app/node_modules

# Copy .next directory and public directory from build stage to prod stage
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public

# Copy Prisma directory from build stage to prod stage
COPY --from=build /app/prisma /app/prisma

# Expose port 80
EXPOSE 7654

# Start the application
CMD ["npm", "start"]
