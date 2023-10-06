

FROM node:lts-slim
ENV NODE_ENV production

LABEL maintainer="Team Bidrag"

# Create app directory
WORKDIR /usr/src/app

# Copy both package.json and package-lock.json to WORKDIR
COPY package*.json ./

# Install app dependencies
# RUN npm install --production=false --frozen-lockfile

# Copy the app's source code / all except what is listed in .dockerignore \
# after copying over files that define our app dependencies and install them. \
# This takes advantage of the Docker cache.
COPY . .

# The container listens on the specified network ports at runtime
EXPOSE 8080

# Run the application packaged in the image
CMD ["npm", "start"]