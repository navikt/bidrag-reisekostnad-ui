FROM node:21-alpine3.19
ENV NODE_ENV=production
LABEL maintainer="Team Bidrag"

WORKDIR /app

ADD . .

RUN npm set registry https://registry.npmjs.org/
RUN npm set @navikt:registry https://npm.pkg.github.com
RUN --mount=type=secret,id=reader_token \
    npm config set //npm.pkg.github.com/:_authToken=$(cat /run/secrets/reader_token)

RUN cd server && yarn install --production=false --frozen-lockfile

ENTRYPOINT ["sh", "./init-scripts/start-docker-app-script.sh"]