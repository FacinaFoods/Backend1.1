FROM node:20.16

WORKDIR /api

COPY package* .

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "run" ]

CMD ["dev"]