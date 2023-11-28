import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { IService } from "@/types/common";
import {
  setToLocalStorageCart,
  setTolocalStrorage,
} from "@/utilies/local.storage";
const MAX_Quantity = 10;
interface NextState {
  serviceData: IService[];
  favoriteData: IService[];
  allServices: IService[];
  userInfo: null | string;
}
let getServiceData;
if (typeof localStorage !== "undefined") {
  getServiceData = localStorage.getItem("service-cart");
}
const initialState: NextState = {
  serviceData: getServiceData ? JSON.parse(getServiceData as any) : [],
  favoriteData: [],
  allServices: [],
  userInfo: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.serviceData.find(
        (item: IService) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        console.log(state.serviceData, "redux localstorage");
        state.serviceData.push(action.payload);

        const servicData = JSON.stringify(current(state.serviceData));

        localStorage.setItem("service-cart", servicData);
      }
    },
    increaseQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const updatedServiceData = state.serviceData.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(item.quantity + 1, MAX_Quantity) }
          : item
      );
      state.serviceData = updatedServiceData;
      setTolocalStrorage("service-cart", JSON.stringify(updatedServiceData));
    },
    decreaseQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const updatedServiceData = state.serviceData.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      state.serviceData = updatedServiceData;
      setTolocalStrorage("service-cart", JSON.stringify(updatedServiceData));
    },
    deleteService: (state, action) => {
      // Use filter to create a new array with items not matching the specified id
      state.serviceData = state.serviceData.filter(
        (item) => item.id !== action.payload
      );

      // The above line should be enough to filter out the item, no need for the following code

      // const index = state.serviceData.findIndex((item) => item.id === action.payload);
      // if (index !== -1) {
      //   state.serviceData.splice(index, 1);
      //   setTolocalStrorage("service-cart", JSON.stringify(state.serviceData));
      // }

      // Instead, you can directly update the local storage here
      setTolocalStrorage("service-cart", JSON.stringify(state.serviceData));
    },
    // deleteFavorite: (state, action) => {
    //   state.favoriteData = state.favoriteData.filter(
    //     (item) => item._id !== action.payload
    //   );
    // },

    // resetCart: (state) => {
    //   state.productData = [];
    // },
    // resetFavoriteData: (state) => {
    //   state.favoriteData = [];
    // },

    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
    setAllProducts: (state, action) => {
      state.allServices = action.payload;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteService,
  addUser,
  removeUser,
  setAllProducts,
} = cartSlice.actions;
export default cartSlice.reducer;
