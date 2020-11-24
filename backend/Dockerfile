FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --production
# If you are building your code for production
# RUN npm ci --only=production

# Try forever running - restart when failure
RUN npm install forever -g

# Bundle app source
COPY . .

EXPOSE 3000
# CMD [ "node", "index.js" ]
# Try Forever 
CMD ["forever", "index.js"]