FROM node:lts

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY index.js /usr/src/app/index.js

# Start things up
CMD ["npm", "start"]
