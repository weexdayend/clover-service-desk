# Use a lightweight Node.js image for production
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g prisma

COPY . .

RUN npx prisma generate

EXPOSE 7654

CMD ["npm", "run", "start"]