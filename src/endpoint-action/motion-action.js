import * as motionRequester from '../requester/motion-requester';
import { existPush, existCheckAll, existCount } from '../utility/exist-utility';
import { sendConsole } from '../requester/console-requester';

export const motionAction = {
  start: async (req, res) => {
    try {
      const { user } = req.body;
      await existPush(user, 'outgoing');
      if (await existCount() === 0) {
        await motionRequester.requestStart();
      }
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      await sendConsole(`[ERROR] motionAction.start: ${e}`);
      res.status(500).send(e);
    }
  },

  stop: async (req, res) => {
    try {
      const { user } = req.body;
      await existPush(user, 'incoming');
      if (1 <= await existCount()) {
        await motionRequester.requestStop();
      }
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      await sendConsole(`[ERROR] motionAction.stop: ${e}`);
      res.status(500).send(e);
    }
  },

  forceStart: async (req, res) => {
    try {
      await motionRequester.requestStart();
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      await sendConsole(`[ERROR] motionAction.forceStart: ${e}`);
      res.status(500).send(e);
    }
  },

  forceStop: async (req, res) => {
    try {
      await motionRequester.requestStop();
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      await sendConsole(`[ERROR] motionAction.forceStop: ${e}`);
      res.status(500).send(e);
    }
  }
}
