import * as motionRequester from '../requester/motion-requester';

export const motionAction = {
  startAction: async (req, res) => {
    try {
      await motionRequester.requestStart();
      res.sendStatus(200);
    } catch(e) {
      res.send(500, e);
    }
  },

  stopAction: async (req, res) => {
    try {
      await motionRequester.requestStop();
      res.sendStatus(200);
    } catch(e) {
      res.send(500, e);
    }
  }
}
