import httpRequest from "..";

import { SubmitValues } from "../../components/form";

export const updateCookie = (params: SubmitValues) => {
  return httpRequest.request({
    url: "/updateCookie",
    method: "PUT",
    data: params,
    showLoading: false,
    showResponseMessage: false,
    interceptors: {
      requestInterceptor(config) {
        return config;
      },
      responseInterceptor(res) {
        return res;
      },
    },
  });
};
