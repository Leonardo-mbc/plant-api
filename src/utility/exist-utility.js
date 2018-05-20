import { query } from '../requester/db-requester';
import { sendConsole } from '../requester/console-requester';

export async function existPush(user, direction) {
  switch (direction) {
    case 'incoming':
      try {
        await query('UPDATE `exist-users` INNER JOIN `users` ON `exist-users`.`user-id` = `users`.`id` SET `exist` = ? WHERE `users`.`name` = ?', [true, user]);
        return true;
      } catch (e) {
        console.error(e);
        await sendConsole(`[ERROR] existPush - incoming: ${e}`);
      }
      break;

    case 'outgoing':
      try {
        const a = await query('UPDATE `exist-users` INNER JOIN `users` ON `exist-users`.`user-id` = `users`.`id` SET `exist` = ? WHERE `users`.`name` = ?', [false, user]);
      } catch (e) {
        console.error(e);
        await sendConsole(`[ERROR] existPush - outgoing: ${e}`);
      }
      break;
  }
}


export async function existCheckAll(user, direction) {
  switch (direction) {
    case 'incoming':
      return true;
      break;

    case 'outgoing':
      try {
        const rows = await query('SELECT sum(`exist-users`.`exist`) as existNum FROM `users` LEFT JOIN `exist-users` ON `exist-users`.`user-id` = `users`.`id`', []);
        if (rows[0].existNum === 0) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.error(e);
        await sendConsole(`[ERROR] existCheckAll - outgoing: ${e}`);
      }
      break;
  }
}

export async function existCheck(user) {
  try {
    const rows = await query('SELECT `exist-users`.`exist` as exist, `users`.`name` FROM `users` LEFT JOIN `exist-users` ON `exist-users`.`user-id` = `users`.`id` WHERE `users`.`name` = ?', [user]);  
    if(rows[0].exist === 1) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
    await sendConsole(`[ERROR] existCheck: ${e}`);
  }
}
