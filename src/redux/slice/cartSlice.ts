import { createSlice } from "@reduxjs/toolkit";
import { IService } from "@/types/common";

interface NextState {
  serviceData: IService[];
  favoriteData: IService[];
  allServices: IService[];
  userInfo: null | string;
}

const initialState: NextState = {
  serviceData: [],
  favoriteData: [],
  allServices: [],
  userInfo: null,
};

export const cartSliceService = createSlice({
  name: "services",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.serviceData.find(
        (item: IService) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.serviceData.push(action.payload);
      }
    },
    // addToFavorite: (state, action) => {
    //   const existingProduct = state.favoriteData.find(
    //     (item: StoreProduct) => item._id === action.payload._id
    //   );
    //   if (existingProduct) {
    //     existingProduct.quantity += action.payload.quantity;
    //   } else {
    //     state.favoriteData.push(action.payload);
    //   }
    // },
    increaseQuantity: (state, action) => {
      const existingProduct = state.serviceData.find(
        (item: IService) => item.id === action.payload.id
      );
      existingProduct && existingProduct.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.serviceData.find(
        (item: IService) => item.id === action.payload.id
      );
      if (existingProduct?.quantity === 1) {
        existingProduct.quantity = 1;
      } else {
        existingProduct!.quantity--;
      }
    },
    deleteProduct: (state, action) => {
      state.serviceData = state.serviceData.filter(
        (item) => item.id !== action.payload
      );
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
  deleteProduct,

  addUser,
  removeUser,
  setAllProducts,
} = cartSliceService.actions;
export default cartSliceService;
