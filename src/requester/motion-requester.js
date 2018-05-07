import * as request from './request';
import { ENDPOINT } from '../../configs/endpoint';

export async function requestStart() {
  return await request.post(`${ENDPOINT.motion}/motion/start`);
}

export async function requestStop() {
  return await request.post(`${ENDPOINT.motion}/motion/stop`);
}
