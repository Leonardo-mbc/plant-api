import {singleton} from '../decorators/singleton';
import {requestStart, requestStop} from '../requester/motion-requester';

@singleton
class MotionAction {
  constractor() {}

  async startAction(req, res) {
    try {
      await requestStart();
      res.sendStatus(200);
    } catch(e) {
      res.send(500, e);
    }
  }

  async stopAction(req, res) {
    try {
      await requestStop();
      res.sendStatus(200);
    } catch(e) {
      res.send(500, e);
    }
  }
}

module.exports = {
  MotionAction
};