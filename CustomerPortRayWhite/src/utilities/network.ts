/* eslint-disable no-param-reassign */
/* eslint-disable no-tabs */
import axios from 'axios';
import { backEndBaseURL } from '../constans/setting';
//import { isWeb } from './platform';
import useStores from '../hooks/use-stores';
import { navigate } from 'gatsby';

export const Axios = axios.create({
  validateStatus(status: number) {
    return status >= 200 && status < 400;
  },
  baseURL: backEndBaseURL,
  // timeout: 5000,
});

Axios.interceptors.request.use( // request 拦截器
  async (config: any) => {
    let token = '';
    // if (isWeb) {
    token = localStorage.USER_TOKEN;
    // }
    config.headers.authorization = token;
    config.headers['Content-Type'] = 'application/json'; // To avoid OPTION request
    // console.log('[Network Request]', config.baseURL + config.url);
    return config;
  }, // 在发送请求时执行函数,可用来给 headers 携带 token
  (error: any) => {
    console.error('axios.request.error', error);
    throw error;
  },
);

Axios.interceptors.response.use( // response 拦截器
  (response: any) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(response.config.baseURL + response.config.url, 'status:', response.status);
    }
    return response;
  }, // validateStatus 返回 true 时执行
  /* response = {
    data: {} || "", // `data` 给服务器发送请求的响应数据信息
    status: 200, // `status` 给服务器发送请求的响应 HTTP 状态码
    statusText: "OK", // `statusText` 给服务器发送请求的响应 HTTP 状态信息
    headers: {}, // `headers` 给服务器发送请求的响应 HTTP 响应头
    config: {}, // `config` 给服务器发送请求的配置信息
    request: {}, // `request` 给服务器发送请求的请求信息
  }; */
  // const { headers } = response || {};
  // const token = (headers || {})[AUTH_TOKEN_KEY];
  // setStore(AUTH_TOKEN_KEY, token);
  (error) => { // validateStatus 返回 false 时执行
    /* error = {
      message: "", // `message` 给服务器发送请求的响应错误标题
      response: {}, // `headers` 给服务器发送请求的响应信息
      request: {}, // `request` 给服务器发送请求的请求信息
      config: {}, // `config` 给服务器发送请求的配置信息
    }; */
    // console.log({error});
    try {
      if (error.response.status === 401) {
        console.log('(/ω＼) unauthorised...', error);
        const { rootStore } = useStores();
        // if (userStore.isAuthed) {
        //   rootStore.notify("Authentication expired");
        // }
        // userStore.isAuthed = false;
        // navigate("/");
        // if (isNative) {
        //   // TODO After the 401 could return the reason of unauthorized, we could notify at web side.
        //   rootStore.notify(i18n.t('AUTHENTICATION_EXPIRED'), 'info');
        // }

        // TODO
        // if (isWeb) {
        //   // Remove localStorage.USER_TOKEN from the client side. USER_TOKEN is the identity to get into protected pages.
        //   delete localStorage.USER_TOKEN;
        // } else if (isNative) {
        //   // AsyncStorage.removeItem('USER_TOKEN');
        //   signOut();
        // }
        // userStore.signOut();
        // if (error.response.status === 401) {
        //   console.log('unauthorized, logging out ...');
        //   auth.logout();
        //   router.replace('/auth/login');
        // }
      }
    } catch {
      const errMsg = 'Network error! Check the connection first. Then check the baseURL or Axios global request config.'
        + '\n[RN] Make sure you\'re using ngrok or other non-localhost backends.'
        + '\n[RN] For Conveyor extension, don\'t use https. Use http only.';
      throw new Error(errMsg);
    }
    return Promise.reject(error);
  },
);
