import {post} from './request';
import {ENDPOINT} from '../../configs/endpoint';

export async function requestStart() {
  return await post(`${ENDPOINT.motion}/motion/start`);
}

export async function requestStop() {
  return await post(`${ENDPOINT.motion}/motion/stop`);
}