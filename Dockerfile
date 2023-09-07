# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Install PNPM globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml (or pnpmfile.js if you have it) to the container
COPY package.json pnpm-lock.yaml* pnpmfile.js* ./

# Install dependencies using PNPM
RUN pnpm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that Next.js runs on (default is 3000)
EXPOSE 3000

# Start the Next.js development server using PNPM
CMD ["pnpm", "run", "dev"]
