const express = require('express');
const bodyParser = require('body-parser');
const { motionAction } = require("./endpoint-action/motion-action");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/motion/start', motionAction.startAction);
app.post('/motion/stop', motionAction.stopAction);

app.listen(process.env['PORT'] || 3000);
