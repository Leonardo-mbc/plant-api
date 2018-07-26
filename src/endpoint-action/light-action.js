import * as motionRequester from '../requester/motion-requester';
import * as lightRequester from '../requester/light-requester';
import { existPush, existCheck, existCount } from '../utility/exist-utility';
import { sendConsole } from '../requester/console-requester';

export const lightAction = {
  turnOn: async (req, res) => {
    try {
      const { user } = req.body;
      await existPush(user, 'incoming');
      if (1 <= await existCount()) {
        await lightRequester.turnOn();
      }
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      await sendConsole(`[ERROR] lightAction.turnOn: ${e}`);
      res.status(500).send(e);
    }
  },

  turnOff: async (req, res) => {
    try {
      const { user } = req.body;
      await existPush(user, 'outgoing');
      if (await existCount() === 0) {
        await lightRequester.turnOff();
      }
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      await sendConsole(`[ERROR] lightAction.turnOff: ${e}`);
      res.status(500).send(e);
    }
  },

  turnOnWithGPS: async (req, res) => {
    // GPS から点灯させたいときに使用する
    try {
      const { user } = req.body;
      if (!await existCheck(user)) {
        // existPush はせず、user が存在していないときにだけ点灯する       
        await lightRequester.turnOn();
      }
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      await sendConsole(`[ERROR] lightAction.turnOnWithGPS: ${e}`);
      res.status(500).send(e);
    }
  },

  forceTurnOn: async (req, res) => {
    try {
      await lightRequester.turnOn();
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      await sendConsole(`[ERROR] lightAction.forceTurnOn: ${e}`);
      res.status(500).send(e);
    }
  },

  forceTurnOff: async (req, res) => {
    try {
      await lightRequester.turnOff();
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      await sendConsole(`[ERROR] lightAction.forceTurnOff: ${e}`);
      res.status(500).send(e);
    }
  },
}
