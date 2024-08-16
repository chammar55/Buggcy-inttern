import React from "react";
import useCartStore from "../Hooks/useCart";
import { Link } from "react-router-dom";

function Navbar() {
  const { userdata } = useCartStore();

  return (
    <div className="flex justify-between align p-2 px-6 sm:px-5 max-w-[1440px] mx-auto border-b">
      <h1>
        <Link className="text-lg sm:text-2xl font-bold" to="/">
          Ecomm
        </Link>
      </h1>
      <h1>
        <Link className="text-3xl sm:text-4xl relative" to="/CartPage">
          <ion-icon className="relative" name="cart-outline"></ion-icon>
          {userdata.length === 0 ? (
            ""
          ) : (
            <p className="text-[11px] bg-red-500 rounded-full w-[18px] h-[18px] flex justify-center items-center text-white absolute top-4 -right-1 sm:top-5 sm:-right-0 xxl:top-5 xxl:right-0">
              {userdata.length}
            </p>
          )}
        </Link>
      </h1>
    </div>
  );
}

export default Navbar;
