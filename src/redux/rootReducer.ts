import { baseApi } from "./api/baseApi";
import cartSlice from "./slice/cartSlice";
import sidebarReducer from "./slice/sidebarSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  sidebar: sidebarReducer,
  cart: cartSlice,
};
