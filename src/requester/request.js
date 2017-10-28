import fetch from 'node-fetch';

export async function post(url) {
  return await fetch(url, {
    method: 'POST'
  });
}