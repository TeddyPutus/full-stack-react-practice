FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
# RUN node /app/backend/app.js
CMD ["node", "backend/app.js"]
EXPOSE 5001