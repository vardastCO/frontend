FROM node:18.15.0-alpine

  # Set the working directory
WORKDIR /usr/src/app

RUN npm i -g pnpm ts-node

  # Copy package.json and yarn.lock files
COPY ./package*.json  ./

COPY ./ ./

RUN cp .env.example .env

RUN pnpm install
RUN pnpm codegen

# Build the app for production
RUN pnpm build

  # Expose the app port
EXPOSE 3000

  # Start the app
CMD ["pnpm", "start"]