FROM node:22-alpine

RUN addgroup appgroup && adduser -S -G appgroup appuser

WORKDIR /app

RUN chown -R appuser:appgroup /app

USER appuser

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 8080

CMD ["npm","start"]