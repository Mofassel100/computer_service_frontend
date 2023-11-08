import { baseApi } from "./api/baseApi";
import { cartSliceService } from "./slice/cartSlice";
import sidebarReducer from "./slice/sidebarSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  sidebar: sidebarReducer,
  services: cartSliceService.reducer,
};
