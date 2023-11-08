// import { IMeta } from "@/types";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { instant as axiosInstant } from "./axiosInstant";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      meta?: any;
      // meta?: Imeta;
      contentType?: String;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, contentType }) => {
    console.log("datasss", data);
    try {
      const result = await axiosInstant({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          "Content-Type": "application/json" || contentType,
        },
      });
      return result;
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      console.log("err", err);
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
