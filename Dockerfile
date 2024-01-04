# Use a Node.js base image with Yarn installed
FROM node:20.10.0-alpine

  # Set the working directory
WORKDIR /usr/src/app

RUN npm i -g pnpm ts-node

  # Copy package.json and yarn.lock files
COPY ./package*.json  ./

COPY ./pnpm-lock.yaml  ./


RUN pnpm install

COPY ./ ./

RUN cp .env.example .env

# Build the app for production
RUN pnpm build

  # Expose the app port
EXPOSE 3000

  # Start the app
CMD ["pnpm", "start"]
