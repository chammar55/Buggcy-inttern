import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { SwiperList } from "./SwiperList";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

function Hero() {
  const handleShopNowClick = () => {
    // Find the section to scroll to
    const section = document.getElementById("electronics");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {SwiperList.map((data, index) => {
          return (
            <SwiperSlide
              key={index}
              className="w-full h-[60vw] md:h-[600px] flex justify-end"
              style={{ backgroundColor: data.bgcolor }}
            >
              <div className="grid grid-cols-2 max-w-[1440px] mx-auto">
                <div className="flex flex-col gap-7 items-start justify-center p-5">
                  <p className="text-[2vw] md:text-2xl lg:text-3xl">
                    {data.sale}
                  </p>
                  <h1 className="text-[5vw] md:text-5xl lg:text-7xl font-bold">
                    {data.title}
                  </h1>
                  <button
                    onClick={handleShopNowClick}
                    className="text-[3vw] p-[1vw] rounded-md md:text-3xl md:px-4 md:py-3"
                    style={{ backgroundColor: data.button }}
                  >
                    Shop Now
                  </button>
                </div>
                <div className="relative xxl:flex xxl:justify-end">
                  <img
                    className="lg:max-w-[550px] absolute bottom-0"
                    src={data.image}
                    alt="image"
                    loading="lazy"
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Hero;
