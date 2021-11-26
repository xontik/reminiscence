FROM node:14-alpine as add

WORKDIR /app

COPY index.js index.js

ENTRYPOINT ["node","index.js"]
