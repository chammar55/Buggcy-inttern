import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";

function OrderForm() {
  return (
    <Form>
      <div className="flex justify-between gap-3">
        <div className="mb-4 flex-1">
          <label
            htmlFor="name"
            className="  block text-gray-700 max-sm:text-[12px] md:text-lg"
          >
            Name
          </label>
          <Field
            name="name"
            type="text"
            className="w-full px-3 py-2 border rounded"
          />
          <ErrorMessage
            name="name"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="mb-4 flex-1">
          <label
            htmlFor="email"
            className="block text-gray-700 max-sm:text-[12px] md:text-lg"
          >
            Email
          </label>
          <Field
            name="email"
            type="email"
            className="w-full px-3 py-2 border rounded"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <div className="mb-4 flex-1">
          <label
            htmlFor="cardNumber"
            className="max-sm:text-[12px] md:text-lg block text-gray-700"
          >
            Card Number
          </label>
          <Field
            name="cardNumber"
            type="text"
            className="w-full px-3 py-2 border rounded"
          />
          <ErrorMessage
            name="cardNumber"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="mb-4 flex-1">
          <label
            htmlFor="expiryDate"
            className="max-sm:text-[12px] md:text-lg block text-gray-700"
          >
            Expiry Date (MM/YY)
          </label>
          <Field
            name="expiryDate"
            type="text"
            className="w-full px-3 py-2 border rounded"
          />
          <ErrorMessage
            name="expiryDate"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <div className="mb-4 flex-1">
          <label
            htmlFor="cvv"
            className="block text-gray-700 max-sm:text-[12px] md:text-lg"
          >
            CVV
          </label>
          <Field
            name="cvv"
            type="text"
            className="w-full px-3 py-2 border rounded"
          />
          <ErrorMessage
            name="cvv"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="mb-4 flex-1">
          <label
            htmlFor="nameOnCard"
            className="block text-gray-700 max-sm:text-[12px] md:text-lg"
          >
            Name on Card
          </label>
          <Field
            name="nameOnCard"
            type="text"
            className="w-full px-3 py-2 border rounded"
          />
          <ErrorMessage
            name="nameOnCard"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded max-sm:text-[14px] md:text-lg"
      >
        Place Order
      </button>
    </Form>
  );
}

export default OrderForm;
