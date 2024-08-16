import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import useSWR, { mutate } from "swr";
import axios from "axios";

function ProductModel({ selectedProduct, handleSubmit, addNewProduct }) {
  // Initial form values
  const initialValues = {
    title: "",
    price: "",
    description: "",
    image: "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Product Title is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    description: Yup.string().required("Description is required"),
    image: Yup.string().required("ImageUrl is required"),
  });

  return (
    <div className="max-w-[576px] w-full">
      <div className="bg-white p-2 md:p-6 rounded shadow-lg max-w-xl mx-auto w-full h-auto">
        <Formik
          initialValues={addNewProduct ? initialValues : selectedProduct}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          // enableReinitialize={true}
        >
          {() => (
            <Form>
              <div className="mb-5">
                <h1 className="font-bold text-3xl">Update Product</h1>
              </div>
              <div className="mb-4 flex-1">
                <label
                  htmlFor="title"
                  className="block text-gray-700 max-sm:text-[12px] md:text-lg"
                >
                  Product Title
                </label>
                <Field
                  name="title"
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4 flex-1">
                <label
                  htmlFor="price"
                  className="block text-gray-700 max-sm:text-[12px] md:text-lg"
                >
                  Price
                </label>
                <Field
                  name="price"
                  type="number"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4 flex-1">
                <label
                  htmlFor="description"
                  className="max-sm:text-[12px] md:text-lg block text-gray-700"
                >
                  Description
                </label>
                <Field
                  name="description"
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4 flex-1">
                <label
                  htmlFor="image"
                  className="max-sm:text-[12px] md:text-lg block text-gray-700"
                >
                  Image URL
                </label>
                <Field
                  name="image"
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded max-sm:text-[14px] md:text-lg"
              >
                {addNewProduct ? "Add" : "Update"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ProductModel;
