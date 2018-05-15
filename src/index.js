const express = require('express');
const bodyParser = require('body-parser');
const { motionAction } = require("./endpoint-action/motion-action");
const { lightAction } = require("./endpoint-action/light-action");

const port = process.env['PORT'] || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/motion/start', motionAction.start);
app.post('/motion/stop', motionAction.stop);
app.post('/light/turnOn', lightAction.turnOn);
app.post('/light/turnOff', lightAction.turnOff);
app.post('/light/turnOnWithGPS', lightAction.turnOnWithGPS);

app.listen(port);
console.log('[plant-api] start', 'port:', port);
