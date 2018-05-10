import * as request from './request';
import { ENDPOINT } from '../../configs/endpoint';

export async function turnOn() {
  return await request.post(ENDPOINT.light.turnOnTheLight);
}

export async function turnOff() {
  return await request.post(ENDPOINT.light.turnOffTheLight);
}
