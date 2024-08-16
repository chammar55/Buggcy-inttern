import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import Rating from "../../Components/Ratings/Rating";
import ProductList from "../../Components/ProductList/ProductList";
import useCartStore from "../../Hooks/useCart";
import { TailSpin } from "react-loader-spinner";
import ProductModel from "../../Components/ProductModel/ProductModel";
import axios from "axios";

function ProductDetailsPage() {
  const { userdata, addToCart } = useCartStore();
  const [isDisabled, setIsDisabled] = useState(false);
  const { id } = useParams();
  const { data: initialData, error } = useSWR(
    `https://fakestoreapi.com/products/${id}`
  );
  const [showModel, setShowModel] = useState(false);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const handleClick = async () => {
    addToCart(data);
    setIsDisabled(true);
    const response = await axios.post(`https://fakestoreapi.com/carts`, {
      userId: 1,
      date: new Date().toISOString(),
      products: [{ productId: data.id, quantity: 1 }],
    });

    console.log(response.data);
  };

  useEffect(() => {
    if (data) {
      // Check if the item is already in the cart
      const isItemInCart = userdata.some((item) => item.id === data.id);
      setIsDisabled(isItemInCart);
    }
  }, [userdata, data]);

  const RecommCategory = data?.category;
  // console.log(RecommCategory);
  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modal-background") {
      setShowModel(false);
    }
  };
  const handleDetailProduct = () => {
    setShowModel(true);
    // handleProductUpdate(true, data);
    // handleupdateProduct(false);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    const response = await axios.put(
      `https://fakestoreapi.com/products/${data.id}`,
      values
    );
    const updatedProduct = { ...response.data, rating: data.rating };
    setData(updatedProduct);
    setShowModel(false);
  };

  return (
    <>
      {showModel ? (
        <div
          id="modal-background"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
          onClick={handleClickOutsideModal}
        >
          <ProductModel selectedProduct={data} handleSubmit={handleSubmit} />
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-col mx-auto justify-center gap-8 max-w-[1440px]  ">
        <div className="grid md:grid-cols-2 gap-2 p-6 grid-cols-1">
          <div className="flex items-center justify-center">
            <img className="w-[300px]" src={`${data.image}`} alt="productImg" />
          </div>
          <div className="flex flex-col gap-2 p-6  justify-center">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between pr-5 ">
                <p className="font-bold text-gray-600 text-lg sm:text-xl capitalize">
                  {data.category}
                </p>
                <svg
                  onClick={() => handleDetailProduct()}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-pencil"
                >
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                  <path d="m15 5 4 4" />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl">{data.title}</h1>
              <div className="flex gap-5">
                <p className="text-xl">Rating</p>
                <Rating rating={data.rating.rate} /> {data.rating.rate}
              </div>
            </div>
            <h3 className="text-2xl font-bold">$ {data.price}</h3>
            <div className="flex flex-col gap-2">
              <p className="text-lg sm:text-xl">{data.description}</p>
              <div className="flex gap-3">
                <button
                  className={`flex items-center justify-center text-white gap-2 h-8 p-2 cursor-pointer rounded-md ${
                    isDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-red-500"
                  }`}
                  onClick={handleClick}
                  style={{ pointerEvents: isDisabled ? "none" : "auto" }}
                >
                  Add to Cart
                </button>
                <Link
                  to="/CartPage"
                  className={`flex items-center justify-center text-white gap-2 h-8 p-2 cursor-pointer bg-black rounded-md`}
                >
                  Go to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Recommended Category********************************** */}

        <ProductList
          heading={`${RecommCategory}`}
          category={`${RecommCategory}`}
        />
      </div>
    </>
  );
}

export default ProductDetailsPage;
