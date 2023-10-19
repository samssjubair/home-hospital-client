import { baseApi } from "./api/baseApi";
import cartReducer from "./cart/cartSlice";
import uiReducer from "./ui/uiSlice";

export const reducer = {
  cart: cartReducer,
  ui: uiReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};