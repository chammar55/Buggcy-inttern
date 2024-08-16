import React from "react";
import { Link } from "react-router-dom";

function AddNewProductCard({ handleAddNewProduct }) {
  return (
    <div>
      <Link className="">
        <div className="border border-gray-300 rounded-lg shadow-md w-64 h-[400px] m-4 p-5 flex flex-col items-center justify-center bg-neutral-200 transition-transform duration-300 hover:scale-105">
          <div
            onClick={() => handleAddNewProduct(true)}
            className="flex flex-col items-center justify-center group"
          >
            <div className="bg-neutral-300 rounded-full p-7 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <ion-icon name="add-outline"></ion-icon>
            </div>
            <p className=" group-hover:block transition-opacity duration-300 opacity-0 group-hover:opacity-100 mt-2">
              Add new Product
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default AddNewProductCard;
