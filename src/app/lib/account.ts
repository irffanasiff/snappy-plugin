import axios from 'axios';
import { UserResponse } from '../../../typings/Definitions';

export async function subscribe(url: string, cb: (res: UserResponse, token: string) => void, code: any) {
  axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    })
    .then(async (res) => {
      if (res.data.code === code) {
        const authResponse: UserResponse = res.data;
        const token = authResponse.token as string;
        const _id = authResponse.user._id as string;
        console.log('res data - ', res.data);
        parent.postMessage({ pluginMessage: { type: 'login', data: { token, _id } } }, '*');
        return cb(res.data, token);
      } else if (res.data === 'ping') {
        console.log('server pinged try again');
        subscribe(url, cb, code);
      }
    })
    .catch((err) => {
      console.log('getting error from server', err);
    });
}
