import React, { useEffect, useState } from "react";
import "./Home.css";
import Hero from "../../Components/Hero/Hero";
import ProductList from "../../Components/ProductList/ProductList";
import useSWR from "swr";
import { TailSpin } from "react-loader-spinner"; // Import the spinner

function Home() {
  const { data, error } = useSWR(`products/categories`);

  // console.log(data);
  if (error) return <div>Error loading data.</div>;
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
  return (
    <div>
      {/* Hero section********************************************************************* */}
      <section>
        <Hero />
      </section>
      {/* Filters section********************************************************************** */}
      <section>
        {/* Navigation Buttons */}
        <nav className="flex my-8 justify-center text-[3vw] sm:text-xl md:text-2xl">
          {data.map((category, index) => (
            <a
              key={category}
              href={`#${category}`}
              className={` text-black p-2 sm:py-2 sm:px-4 border capitalize ${
                index === 0 ? "rounded-l-full" : ""
              } ${index === data.length - 1 ? "rounded-r-full" : ""}`}
            >
              {category}
            </a>
          ))}
        </nav>
      </section>
      {/* Products section********************************************************************* */}

      <section className="my-10 flex flex-col gap-10 max-w-[1440px]  mx-auto ">
        {data.map((data, index) => (
          <div key={data} id={data} className="my-5 ">
            <ProductList heading={data} category={data} />
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
