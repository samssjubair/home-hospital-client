"use client"

"use client";
import { removeFromCart, removeOne } from "@/redux/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cart.services);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRemoveOne = (item: any) => {
    dispatch(removeOne(item));
  };

  const handleRemoveFromCart = (item: any) => {
    dispatch(removeFromCart(item));
  };

  const total = useAppSelector((state) => state.cart.total);

  return (
    <div className="bg-pink-200 p-8">
      <h1 className="text-3xl font-semibold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item: any) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 mb-4 bg-white flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-500">
                  Organization: {item.organization}
                </p>
                <p className="text-gray-500">Title: {item.category.title}</p>
                <p className="text-gray-500">Price: ${item.price}</p>
              </div>
              <div className="flex items-center">
                <button
                  className="text-red-500 mr-4"
                  onClick={() => handleRemoveOne(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="bg-pink-100 p-4 rounded-lg mt-4">
            <h2 className="text-xl font-semibold">Total: ${total}</h2>
          </div>
          <button
            className="bg-pink-500 text-white text-lg mt-4 px-6 py-2 rounded-lg hover:bg-pink-600"
            onClick={() => router.push('/multi-booking')} // Implement your logic here
          >
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
