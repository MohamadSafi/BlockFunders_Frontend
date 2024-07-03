import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CampaignCard from "../Custom/CampaignCard";

const CampaignCarousel = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="relative mt-16">
      <Slider ref={sliderRef} {...settings}>
        <div className="p-4">
          <CampaignCard
            username={"Sam whinchester"}
            title={"Lance | O₂ – Light & Smart | Built in Titanium"}
            desc={
              "Designed on Earth, used in space. Titanium, almost imperceptible. Wearing them feels as natural as breathing."
            }
            days={"20"}
            funded={"40"}
            img={"imgs/home/camp1.png"}
            profileImg={"imgs/home/profile2.png"}
          />
        </div>
        <div className="p-4">
          <CampaignCard
            username={"Dean whinchester"}
            title={"NLT SonRise Edition Bible"}
            desc={
              "A beautifully designed Bible that's handbound with full-grain leather."
            }
            days={"25"}
            funded={"10"}
            img={"imgs/home/camp2.png"}
            profileImg={"imgs/home/profile1.png"}
          />
        </div>
        <div className="p-4">
          <CampaignCard
            username={"Zack sniper"}
            title={"The Lord of the Rings Playing Cards Vol. 3"}
            desc={
              "Officially Licensed playing cards inspired by The Lord of the Rings™, The Return of the King"
            }
            days={"2"}
            funded={"90"}
            img={"imgs/home/camp3.png"}
            profileImg={"imgs/home/profile.png"}
          />
        </div>
      </Slider>
      <div className="absolute top-[-10] right-0 flex space-x-2">
        <PrevArrow className="custom-prev-arrow" onClick={previous} />
        <NextArrow className="custom-next-arrow" onClick={next} />
      </div>
    </div>
  );
};

const NextArrow = ({ className, style, onClick }) => {
  return (
    <button
      className={`custom-arrow ${className}`}
      style={{ ...style, zIndex: 2 }}
      onClick={onClick}
    >
      <svg
        className="h-5 w-5 text-indigo-600 group-hover:text-white"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M5.99984 4.00012L10 8.00029L5.99748 12.0028"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

const PrevArrow = ({ className, style, onClick }) => {
  return (
    <button
      className={`custom-arrow ${className}`}
      style={{ ...style, zIndex: 2 }}
      onClick={onClick}
    >
      <svg
        className="h-5 w-5 text-indigo-600 group-hover:text-white"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M10.0002 11.9999L6 7.99971L10.0025 3.99719"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default CampaignCarousel;
