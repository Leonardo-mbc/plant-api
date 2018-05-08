import * as request from './request';
import { ENDPOINT } from '../../configs/endpoint';

export async function sendConsole(text) {
  return await request.post(ENDPOINT.console, { text });
}
