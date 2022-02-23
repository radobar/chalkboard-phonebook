FROM node:11
WORKDIR /app
RUN npm install
CMD npm run build && npm run start:prod
