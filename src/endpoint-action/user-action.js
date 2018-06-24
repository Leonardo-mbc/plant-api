import { existPush } from '../utility/exist-utility';
import { sendConsole } from '../requester/console-requester';

const guest = 'Guest';
export const userAction = {
  guestEnter: async (req, res) => {
    try {
      await existPush(guest, 'incoming');
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      await sendConsole(`[ERROR] userAction.guestEnter: ${e}`);
      res.status(500).send(e);
    }
  },

  guestLeave: async (req, res) => {
    try {
      await existPush(guest, 'outgoing');
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      await sendConsole(`[ERROR] userAction.guestLeave: ${e}`);
      res.status(500).send(e);
    }
  }
}
