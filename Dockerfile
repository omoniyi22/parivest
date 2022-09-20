FROM node

copy . .

RUN npm install

CMD ["node", server]