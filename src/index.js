const express = require('express');
const bodyParser = require('body-parser');
const { motionAction } = require("./endpoint-action/motion-action");
const { lightAction } = require("./endpoint-action/light-action");
const { userAction } = require("./endpoint-action/user-action");

const port = process.env['PORT'] || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/motion/start', motionAction.start);
app.post('/motion/stop', motionAction.stop);
app.post('/light/turnOn', lightAction.turnOn);
app.post('/light/turnOff', lightAction.turnOff);
app.post('/light/turnOnWithGPS', lightAction.turnOnWithGPS);

app.post('/motion/forceStart', motionAction.forceStart);
app.post('/motion/forceStop', motionAction.forceStop);
app.post('/light/forceTurnOn', lightAction.forceTurnOn);
app.post('/light/forceTurnOff', lightAction.forceTurnOff);

app.post('/user/guestEnter', userAction.guestEnter);
app.post('/user/guestLeave', userAction.guestLeave);

app.listen(port);
console.log('[plant-api] start', 'port:', port);
