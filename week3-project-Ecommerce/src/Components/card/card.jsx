import React, { useEffect, useState } from "react";

import Rating from "../Ratings/Rating";
import { Link } from "react-router-dom";
import useCartStore from "../../Hooks/useCart";
import ProductModel from "../ProductModel/ProductModel";
import axios from "axios";
import { addToCartService } from "../../Services/cartService";

const fallbackImage = "path/to/fallback/image.jpg"; // if image from api not loaded

const Card = ({
  data,
  handleDelete,
  handleProductUpdate,
  handleupdateProduct,
}) => {
  const { userdata, addToCart } = useCartStore();
  const [isDisabled, setIsDisabled] = useState(false);
  const [DeleteProducts, setDeleteProducts] = useState([]);

  useEffect(() => {
    // Check if the item is already in the cart
    const isItemInCart = userdata.some((item) => item.id === data.id);
    setIsDisabled(isItemInCart);
  }, [userdata, data.id]);

  const handleClick = async () => {
    addToCart(data);
    // console.log(data);
    setIsDisabled(true);
    // Add your logic for adding to cart here
    const response = await addToCartService(data);
    console.log(response.data);
  };

  const handleCardProduct = () => {
    handleProductUpdate(true, data); //taking card data and giving it to product model
    handleupdateProduct(false); // booolean to apply updateProduct logic
  };

  return (
    <div className="relative group flex flex-col items-center overflow-hidden ">
      <Link className="" to={`/ProductDetailsPage/${data.id}`}>
        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md w-64 h-[400px] m-4 p-5 flex flex-col items-center justify-start relative ">
          {/* img div */}
          <div className="flex items-center justify-center h-[50%]">
            <img
              src={`${data.image}`}
              alt="image"
              className="w-full max-h-[180px] object-contain transition-transform duration-200 hover:scale-110"
              onError={(e) => (e.target.src = fallbackImage)}
            />
          </div>

          <div className="absolute bottom-0 p-4 flex flex-col gap-2">
            <Link to={`/ProductDetailsPage/${data.id}`}>
              <div className="flex flex-col ">
                <p className="text-[18px] font-bold">{`$ ${data.price}`}</p>
                <h3 className="text-[1.2em] mb-[8px]">
                  {data.title.slice(0, 30) + "..."}
                </h3>

                <div className="flex">
                  <div className="flex gap-5">
                    <Rating rating={data.rating.rate} /> {data.rating.rate}
                  </div>
                </div>
              </div>
            </Link>
            <Link to={isDisabled ? "/CartPage" : ""}>
              <div
                className={`flex items-center justify-center text-white gap-2 h-8 p-2 cursor-pointer ${
                  isDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-red-500"
                }`}
                onClick={() => handleClick()}
                style={{ pointerEvents: isDisabled ? "none" : "auto" }}
              >
                {isDisabled ? "" : <ion-icon name="add-outline"></ion-icon>}
                <p>{isDisabled ? "Go to Cart" : "Add to Cart"}</p>
                {isDisabled ? (
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                ) : (
                  ""
                )}
              </div>
            </Link>
          </div>
        </div>
      </Link>
      <div className=" z-10 absolute top-4 -right-8 sm:top-8 sm:-right-8 group-hover:right-4 sm:group-hover:right-8 transition-all duration-300 flex flex-col gap-4">
        <Link
          className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-lg"
          onClick={() => handleCardProduct()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-pencil stroke-white p-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-lg"
          >
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
            <path d="m15 5 4 4"></path>
          </svg>
        </Link>
        <button
          className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-lg"
          onClick={() => handleDelete(data.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-trash   stroke-white p-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-lg"
          >
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;
