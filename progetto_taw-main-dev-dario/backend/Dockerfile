FROM node:20

WORKDIR /

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npx tsc

# Install nodemon globally (optional)
RUN npm install -g nodemon

# Step 6: Install TypeScript globally and compile the TypeScript files (optional)
RUN npm install -g typescript ts-node

EXPOSE 5001

#Step 8: Start the app with Nodemon in development mode
CMD ["npx", "nodemon", "--legacy-watch", "--watch", "src", "--ext", "ts,js,json", "--exec", "ts-node", "src/app.ts"]
