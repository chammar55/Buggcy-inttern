import React, { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Card from "../card/card";
import useProducts from "../../Hooks/useProducts";
import { TailSpin } from "react-loader-spinner";
import AddNewProductCard from "../AddNewProductCard/AddNewProductCard";
import ProductModel from "../ProductModel/ProductModel";

function ProductList({ heading, category }) {
  const { data: initialData, isLoading, isError } = useProducts({ category });
  const [data, setData] = useState([]);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  // console.log(data);
  // const { data: initialData, isLoading, isError } = useProducts({ category });
  // const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [DeleteProducts, setDeleteProducts] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [addNewProduct, setAddNewProduct] = useState(false);

  // console.log(filteredData);
  const handleProductUpdate = (data1, cardData) => {
    setIsModalOpen(data1);
    setSelectedProduct(cardData);
  };

  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modal-background") {
      setIsModalOpen(false);
    }
  };

  const handleHideModel = (data) => {
    setIsModalOpen(data);
  };

  if (isError) return <div>Error loading data.</div>;
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

  // delete products *****************************
  const handleDelete = async (id) => {
    const response = await axios.delete(
      `https://fakestoreapi.com/products/${id}`
    );
    const updatedProducts = response.data;

    const delArray = [...DeleteProducts, updatedProducts.id];
    setDeleteProducts(delArray);
    // handleDataFromCard(delArray);
  };
  const filteredData = data?.filter(
    (item) => !DeleteProducts.includes(item.id)
  );

  // Add  products **********************************
  const handleSubmit = async (values) => {
    console.log("value", values);
    if (addNewProduct) {
      const response = await axios.post(
        `https://fakestoreapi.com/products`,
        values
      );
      const updatedProduct = {
        ...response.data,
        rating: { rate: 0, count: 0 },
        category: category,
      };
      console.log(updatedProduct);
      setData((prevProducts) => [...prevProducts, updatedProduct]);
    } else {
      // update Product ********************************
      const response = await axios.put(
        `https://fakestoreapi.com/products/${selectedProduct.id}`,
        values
      );
      const updatedProduct = response.data;
      setData((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id
            ? { ...product, ...updatedProduct }
            : product
        )
      );
    }
    handleHideModel(false);
  };

  const handleAddNewProduct = (data) => {
    handleHideModel(data);
    setAddNewProduct(data);
  };
  const handleupdateProduct = (data) => {
    setAddNewProduct(data);
  };

  return (
    <div className="">
      <h1 className="capitalize px-20 whitespace-nowrap flex justify-center text-3xl font-bold">
        {heading}
      </h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <Swiper
          slidesPerView={"auto"}
          // centeredSlides={true}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className=" p-5 "
          breakpoints={{
            768: {
              slidesPerView: 3,
              spaceBetween: 60,
            },

            1024: {
              slidesPerView: 4,
              spaceBetween: 60,
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
        >
          {filteredData.map((data, index) => (
            <>
              <SwiperSlide className=" max-md:flex max-md:items-center max-md:justify-center ">
                <Card
                  data={data}
                  key={index}
                  handleDelete={handleDelete}
                  handleProductUpdate={handleProductUpdate}
                  handleupdateProduct={handleupdateProduct}
                />
              </SwiperSlide>
            </>
          ))}
          <SwiperSlide className="flex items-center">
            <AddNewProductCard handleAddNewProduct={handleAddNewProduct} />
          </SwiperSlide>
          <div className="autoplay-progress" slot="container-end"></div>
        </Swiper>
      </ul>
      {/* model */}
      {isModalOpen ? (
        <div
          id="modal-background"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
          onClick={handleClickOutsideModal}
        >
          <ProductModel
            selectedProduct={selectedProduct}
            handleHideModel={handleHideModel}
            handleSubmit={handleSubmit}
            addNewProduct={addNewProduct}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ProductList;
