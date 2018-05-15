import * as motionRequester from '../requester/motion-requester';
import * as lightRequester from '../requester/light-requester';
import { existPush, existCheckAll, existCheck } from '../utility/exist-utility';
import { sendConsole } from '../requester/console-requester';

export const lightAction = {
  turnOn: async (req, res) => {
    try {
      const { user } = req.body;
      await existPush(user, 'incoming');
      if (await existCheckAll(user, 'incoming')) {
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
      if (await existCheckAll(user, 'outgoing')) {
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
}
