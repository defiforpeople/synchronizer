FROM node:18.6.0 as builder
WORKDIR /app
COPY . .
RUN node_modules/typescript/bin/tsc

FROM node:18.6.0
WORKDIR /app
RUN --from=builder /app/dist dist
RUN --from=builder /app/package.json .
RUN npm install --production
CMD ["node", "/app/dist/index.js"]