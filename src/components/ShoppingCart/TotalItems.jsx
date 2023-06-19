import React from "react";
import { CartUseContext } from "../../context/CartContext";

const TotalItems = () => {
  const { cart, itemsQuanty } = CartUseContext();

  return (
    <div className="flex justify-end  ">
      <span className="bg-red-500 text-white rounded-full p-1 text-xs m-0 -mt-3 -mr-2 w-5 text-center">
        {itemsQuanty}
      </span>
    </div>
  );
};

export default TotalItems;
