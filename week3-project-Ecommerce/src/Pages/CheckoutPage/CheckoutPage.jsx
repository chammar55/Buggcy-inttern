import React, { useState } from "react";
import useCartStore from "../../Hooks/useCart";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import OrderForm from "../../Components/OrderForm/OrderForm";

function CheckoutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    userdata,
    shippingCost,
    finalTotalPrice,
    tax,
    discount,
    discountAmount,
    removeAllCartItems,
  } = useCartStore();

  // Initial form values
  const initialValues = {
    name: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    cardNumber: Yup.string()
      .required("Card number is required")
      .matches(/^[0-9]{16}$/, "Card number must be 16 digits"),
    expiryDate: Yup.string()
      .required("Expiry date is required")
      .matches(
        /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
        "Expiry date must be in MM/YY format"
      ),
    cvv: Yup.string()
      .required("CVV is required")
      .matches(/^[0-9]{3}$/, "CVV must be 3 digits"),
    nameOnCard: Yup.string().required("Name on card is required"),
  });

  const handleSubmit = (values) => {
    // Handle form submission
    console.log("Form Values:", values);
    setIsModalOpen(true);

    // Example: Send values to a server or update application state
  };
  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modal-background") {
      setIsModalOpen(false);
      removeAllCartItems();
    }
  };

  const handleComtinueShopping = () => {
    setIsModalOpen(false);
    removeAllCartItems();
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

  return (
    <>
      {userdata.length == 0 ? (
        <div className="flex flex-col gap-4 justify-center items-center w-full h-[100vh]">
          <p>There are no items in this cart</p>{" "}
          <Link
            className="flex justify-center items-center gap-2 p-2 border w-[200px] border-black"
            to="/"
          >
            <ion-icon name="arrow-back-outline"></ion-icon> Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 p-6 md:gap-6 max-w-[1200px] mx-auto shadow-lg my-6">
          <div className="flex flex-col col-span-3 md:col-span-2 ">
            <div className="flex justify-between border-b-[2px] pb-5 font-bold text-lg md:text-2xl">
              <h1 className="text-2xl font-bold ">Checkout</h1>
            </div>
            {/* Formik form *********************************** */}
            <div className="container mx-auto p-4">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values }) => <OrderForm />}
              </Formik>
            </div>
          </div>
          {/* show after 786px  ********************************/}
          <div className=" md:block col-span-1">
            <div className="flex justify-between border-b-[2px] pb-5 font-bold text-2xl">
              <p>Order Summary</p>
            </div>
            <div className="flex flex-col ga-3 border-b-[2px] md:p-5 h-[200px] text-md my-3">
              <p className="text-gray-400 text-sm mb-5">
                By placing your order, you agree to our company Privacy policy
                and Conditions of use.
              </p>
              <div className="flex justify-between">
                <h3>Item ({userdata.length})</h3>
                <h3>${totalPrice.toFixed(2)}</h3>
              </div>
              <div className="flex justify-between">
                <p>Shipping and handling</p>
                <p>${shippingCost}</p>
              </div>
              <div className="flex justify-between">
                <p>Discount</p>
                <p>
                  {discount * 100}% ( ${discountAmount.toFixed(2)} )
                </p>
              </div>
              <div className="flex justify-between">
                <p>Tax</p>
                <p>$ {tax.toFixed(2)} </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 my-3">
              <div className="flex justify-between">
                <h3 className="font-bold">Total Cost</h3>
                <h3 className="font-bold">$ {finalTotalPrice.toFixed(2)}</h3>
              </div>
            </div>
          </div>
          {/* Modal ***********************************/}
          {isModalOpen && (
            <div
              id="modal-background"
              className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              onClick={handleClickOutsideModal}
            >
              <div className="bg-white p-2 md:p-6 rounded shadow-lg max-w-sm  mx-auto">
                <h2 className="text-xl md:text-2xl font-bold mb-4">
                  Order Placed
                </h2>
                <p className="text-sm md:text-lg mb-4">
                  Your order has been placed successfully.
                </p>
                <Link
                  to="/"
                  className="flex justify-center items-center gap-2 bg-blue-500 text-sm md:text-xl text-white px-4 py-2 rounded"
                  // onClick={() => setIsModalOpen(false)}
                  onClick={() => handleComtinueShopping()}
                >
                  <ion-icon name="arrow-back-outline"></ion-icon> Continue
                  Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      )}{" "}
    </>
  );
}

export default CheckoutPage;
