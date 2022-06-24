import React from "react";
import Lottie from "react-lottie";
import { emptyBox } from "../../utils/Mocks/lottiesData";

export const EmptyCart = () => {
  return (
    <div className="max-w-7xl mx-auto lg:px-8 lg:py-16 text-center">
      <Lottie options={emptyBox} height={300} width={300} />
      <h2 className="text-3xl text-gray-400">Your cart is empty!</h2>
    </div>
  );
};
