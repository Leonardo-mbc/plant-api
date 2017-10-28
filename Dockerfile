FROM mhart/alpine-node

RUN mkdir -p /src/plant-api
WORKDIR /src/plant-api

RUN rm -rf /src/plant-api/node_modules
COPY package.json /src/plant-api/package.json
RUN npm i --no-progress --registry http://registry.npmjs.org/
COPY . /src/plant-api

EXPOSE 3000

CMD ["./node_modules/pm2/bin/pm2", "--no-daemon", "start", "configs/pm2.prod.json", "-i", "max"]