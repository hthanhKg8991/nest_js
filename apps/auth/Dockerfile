FROM node:alpine AS development
WORKDIR /usr/src/app 
COPY package*.json yarn*.lock ./
RUN apk add --no-cache git \
    && yarn \
    && yarn cache clean

FROM node:alpine AS build

WORKDIR /usr/src/app 
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY . .
RUN yarn build auth

FROM node:alpine AS production
#PRO
# docker build --build-arg NODE_ENV=development -t my-app .
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app 
COPY package*.json yarn*.lock ./

RUN yarn --only=production

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build  /usr/src/app/node_modules ./node_modules
COPY --from=build  /usr/src/app/.env .env

CMD ["node", "dist/apps/auth/main"]