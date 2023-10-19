import { IService } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ICart {
  services: IServiceWithQuantity[];
  total: number;
  totalServices: number; // New field to track total services
}

// Define an extended IService interface with 'quantity' property
interface IServiceWithQuantity extends IService {
  quantity: number;
}

const initialState: ICart = {
  services: [],
  total: 0,
  totalServices: 0, // Initialize totalServices to 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IService>) => {
      const existing = state.services.find(
        (service) => service.id === action.payload.id
      );

      if (existing) {
        // Service already in the cart; do not add it again
        return;
      }

      // Service not in the cart; add it with quantity 1
      state.services.push({ ...action.payload, quantity: 1 });
      state.total += action.payload.price;
      state.totalServices += 1; // Increment totalServices
    },
    removeOne: (state, action: PayloadAction<IService>) => {
      const existing = state.services.find(
        (service) => service.id === action.payload.id
      );

      if (existing && existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        state.services = state.services.filter(
          (service) => service.id !== action.payload.id
        );
      }

      state.total -= action.payload.price;
      state.totalServices -= 1; // Decrement totalServices
    },
    removeFromCart: (state, action: PayloadAction<IService>) => {
      const existing = state.services.find(
        (service) => service.id === action.payload.id
      );

      if (existing) {
        state.total -= action.payload.price * existing.quantity;
        state.services = state.services.filter(
          (service) => service.id !== action.payload.id
        );
        state.totalServices -= existing.quantity; // Reduce totalServices
      }
    },
  },
});

export const { addToCart, removeFromCart, removeOne } = cartSlice.actions;

export default cartSlice.reducer;
