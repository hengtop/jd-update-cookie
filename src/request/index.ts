import { HttpRequest } from "heng-request";

const httpRequest = new HttpRequest({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  cancleRequests: [],
  handleCallback: {
    loadingStart: (config) => {},
    loadingEnd: () => {},
    responseErr: (err: any) => {},
  },
  interceptors: {
    requestInterceptor(config) {
      return config;
    },
    requestInterceptorCatch: (err) => {
      return Promise.reject(err);
    },
    responseInterceptor(res) {
      // 关闭表格加载动画
      return res;
    },
    responseInterceptorCatch(err) {
      return Promise.reject(err);
    },
  },
});

export default httpRequest;
