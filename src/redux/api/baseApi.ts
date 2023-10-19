import { axiosBaseQuery } from "@/helper/axios/axiosBaseQuery";
import { getBaseUrl } from "@/helper/config/envConfig";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../slice/taq-types";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
