import fetch from 'node-fetch';

export async function post(url, body) {
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body)
  });
}
