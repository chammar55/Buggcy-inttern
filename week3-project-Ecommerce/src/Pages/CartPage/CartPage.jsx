import React, { useState, useEffect } from "react";
import useCartStore from "../../Hooks/useCart";
import { Link } from "react-router-dom";
import Cart from "../../Components/Cart/Cart";

function CartPage() {
  const { userdata, removeFromCart, updateQuantity, updateCheckoutData } =
    useCartStore();
  const [shipping, setShipping] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // mobile screen , a screen pop out from bottom to top
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modal-background") {
      setIsOpen(false);
    }
  };
  const handlePopUp = () => {
    setIsOpen(!isOpen);
  };

  const handleIncrement = (id, currentQuantity) => {
    if (currentQuantity < 10) {
      updateQuantity(id, currentQuantity + 1);
    }
  };

  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  const handleChange = (id, e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      updateQuantity(id, value);
    }
  };

  // Function to calculate total price
  const calculateTotalPrice = (items) => {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      total += item.price * item.quantity;
    }
    return total;
  };

  // Calculate total price of all items in the cart
  const totalPrice = calculateTotalPrice(userdata);

  const handleShippingChange = (e) => {
    const selectedShipping = parseInt(e.target.value, 10);
    setShipping(selectedShipping);
  };

  const handleApplyPromo = () => {
    if (promoCode === "ammar" || promoCode === "discount") {
      setDiscount(0.1); // 10% discount
    } else {
      setDiscount(0);
    }
  };

  // Calculate tax (5% of total price)
  const tax = (totalPrice + shipping) * 0.05;

  // Calculate discount amount
  const discountAmount = (totalPrice + shipping + tax) * discount;

  // Calculate final total price
  const finalTotalPrice = totalPrice + shipping + tax - discountAmount;

  useEffect(() => {
    // Update checkout data in the store
    updateCheckoutData(
      shipping,
      finalTotalPrice,
      tax,
      discount,
      discountAmount
    );
  }, [shipping, finalTotalPrice, tax, discount, updateCheckoutData]);

  return (
    <div className="grid grid-cols-3 p-6 gap-6 max-w-[1200px] mx-auto shadow-lg my-6">
      <div className="flex flex-col col-span-3 md:col-span-2">
        <div className="flex justify-between border-b-[2px] pb-5 font-bold text-lg md:text-2xl">
          <p>Shopping Cart</p>
          <p>{userdata.length} Items</p>
        </div>
        <div className="flex justify-center md:justify-between pr-8 text-sm md:text-md text-gray-500 mt-3">
          <span className="flex justify-center md:justify-start w-[50%]">
            Product Details
          </span>
          <span className="hidden md:block">Quantity</span>
          <span className="hidden md:block">Price</span>
          <span className="hidden  w-[60px] md:flex justify-start">Total</span>
        </div>
        <div className="my-6">
          {userdata.length == 0 ? (
            <div className="flex justify-center text-[12px] md:text-sm my-3">
              <p>There are no items in this cart</p>
            </div>
          ) : (
            userdata.map((item) => <Cart item={item} />)
          )}
        </div>
        <div>
          <Link to="/">
            <p className="text-blue-600 flex gap-2 items-center">
              <span className="flex items-center">
                <ion-icon name="arrow-back-outline"></ion-icon>
              </span>
              Continue Shopping
            </p>
          </Link>
        </div>
      </div>
      {/* order summary large screens ( more then 768px) */}
      <div className="hidden md:block col-span-1">
        <div className="flex justify-between border-b-[2px] pb-5 font-bold text-2xl">
          <p>Order Summary</p>
        </div>

        <div className="flex flex-col justify-between border-b-[2px] pb-5 h-[200px] text-md my-3">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl">Shipping</h3>
            <select
              name="shipping"
              id="shipping"
              onChange={handleShippingChange}
              className="px-2 py-1 border rounded"
            >
              <option value="0">Standard Shipping - $0</option>
              <option value="10">Express Shipping - $10</option>
              <option value="15">Fast Shipping - $15</option>
            </select>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl">Promo Code</h3>
            <div className="flex">
              <input
                placeholder="Enter your code"
                className="focus:outline-none px-2 w-[100%] border rounded"
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                className="bg-red-500 text-white px-4 py-2 w-[100px] rounded-sm"
                onClick={handleApplyPromo}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 my-3">
          <div className="flex justify-between">
            <h3 className="font-bold">Total Cost</h3>
            <h3 className="font-bold">${finalTotalPrice.toFixed(2)}</h3>
          </div>
          <Link
            to="/CheckoutPage"
            className="bg-blue-700 text-white px-4 py-2 rounded-sm flex justify-center"
          >
            Checkout
          </Link>
        </div>
      </div>

      {/* Mobile popup from botton (Show more details button) */}
      <div
        id="modal-background"
        className={` ${
          isOpen
            ? " bg-black fixed inset-0  bg-opacity-50 flex items-center justify-center"
            : " "
        }`}
        onClick={handleClickOutsideModal}
      >
        <div
          className={`md:hidden rounded-t-xl fixed bottom-0 left-0 w-full bg-white border-t-2 p-5 transform transition-transform duration-500 ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ height: "80%" }}
        >
          <div className="flex flex-col gap-3 justify-between  pb-5 h-[200px] text-md my-3">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center mb-5 text-2xl">
                <h3 className="text-xl">Shipping</h3>
                <ion-icon
                  onClick={() => handlePopUp()}
                  name="close-outline"
                ></ion-icon>
              </div>
              <select
                name="shipping"
                id="shipping"
                onChange={handleShippingChange}
                className="px-2 py-1 border rounded"
              >
                <option value="0">Standard Shipping - $0</option>
                <option value="10">Express Shipping - $10</option>
                <option value="15">Fast Shipping - $15</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-xl">Promo Code</h3>
              <div className="flex">
                <input
                  placeholder="Enter your code"
                  className="focus:outline-none px-2 w-[100%] border rounded"
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button
                  className="bg-red-500 text-white px-4 py-2 w-[100px] rounded-sm"
                  onClick={handleApplyPromo}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className=" fixed bottom-0 left-0 w-full bg-gray-800 text-white px-3 py-1 md:hidden">
        <div className="container mx-auto flex justify-between items-center">
          <div
            // onClick={() => setIsOpen(!isOpen)}
            onClick={() => handlePopUp()}
            className="flex gap-2 items-center  rounded p-1"
          >
            <div className="flex flex-col ">
              <div className="flex gap-1">
                <h3 className="text-md font-bold ">Total Cost:</h3>
                <h3 className="text-md">${finalTotalPrice.toFixed(2)}</h3>
              </div>
              <div className="flex  gap-1">
                <h3 className="text-sm  ">Shipping Fee:</h3>
                <h3 className="text-sm">${shipping}</h3>
              </div>
            </div>
            {isOpen ? (
              <ion-icon name="chevron-down-outline"></ion-icon>
            ) : (
              <ion-icon name="chevron-up-outline"></ion-icon>
            )}
          </div>

          <Link
            to="/CheckoutPage"
            className="bg-blue-500 text-white p-2 rounded text-md"
          >
            Checkout ({userdata.length})
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
