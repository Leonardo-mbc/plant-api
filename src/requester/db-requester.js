import mysql from 'mysql';
import { ENDPOINT } from '../../configs/endpoint';
import { database } from '../../configs/secret';

const pool = mysql.createPool({
  host     : ENDPOINT.database,
  user     : database.user,
  password : database.password,
  database : 'plant-api',
  connectionLimit: 10
});

export async function query(query, variable) {
  try {
    const rows = await new Promise((resolve, reject) => {
      pool.getConnection((error, connection) => {
        if(error) {
          return reject(error)
        } else {
          connection.query(query, variable, (queryError, rows) => {
            if (queryError) {
              return reject(queryError)
            }

            return resolve(rows);
          });
        }
        connection.release();
      });
    });

    return rows;
  } catch(e) {
    console.error(e) 
    await sendConsole(`[ERROR] db-requester - query: ${e}`);               
  }

  return;
}
