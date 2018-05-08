import * as motionRequester from '../requester/motion-requester';
import { existPush, existCheck } from '../utility/exist-utility';
import { sendConsole } from '../requester/console-requester';

export const motionAction = {
  startAction: async (req, res) => {
    try {
      const { user } = req.body;
      await existPush(user, 'outgoing');
      if(await existCheck(user, 'outgoing')) {
        await motionRequester.requestStart();
      }
      res.sendStatus(200);
    } catch(e) {
      await sendConsole(`[ERROR] startAction: ${e}`);      
      res.send(500, e);
    }
  },

  stopAction: async (req, res) => {
    try {
      const { user } = req.body;
      await existPush(user, 'incoming');
      if(await existCheck(user, 'incoming')) {
        await motionRequester.requestStop();
      }
      res.sendStatus(200);
    } catch(e) {
      await sendConsole(`[ERROR] stopAction: ${e}`);      
      res.send(500, e);
    }
  }
}
