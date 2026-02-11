# Frontend build stage
FROM node:18-alpine as frontend-build
WORKDIR /app/frontend
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Backend stage
FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./server/
RUN cd server && npm ci
COPY server ./server
COPY --from=frontend-build /app/frontend/dist ./server/public

EXPOSE 5000
WORKDIR /app/server
CMD ["npm", "start"]
