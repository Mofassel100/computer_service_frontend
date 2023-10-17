import { baseApi } from "./api/baseApi";
import sidebarReducer from "./slice/sidebarSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  sidebar: sidebarReducer,
};
