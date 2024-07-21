import React, { useRef, useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import CampaignCard from "../Custom/CampaignCard";
import AuthContext from "@/providers/AuthContext";
import { fetchEthPriceInUsd } from "@/utils/ethToUsd";

const CampaignCarousel = () => {
  const sliderRef = useRef(null);
  const { token } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);
  const [ethPriceInUsd, setEthPriceInUsd] = useState(0);

  const calculateDaysLeft = (deadline) => {
    const now = new Date().getTime();
    const timeLeft = deadline - now;
    return Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    const getEthPrice = async () => {
      const price = await fetchEthPriceInUsd();
      if (price !== null) {
        setEthPriceInUsd(price);
      }
    };
    getEthPrice();
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [token]);

  const fetchCampaigns = () => {
    axios
      .get("https://block-funders.haidarjbeily.com/public/api/campaigns", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          with_paginate: 1,
          per_page: 5,
          q: "published",
        },
      })
      .then((response) => {
        setCampaigns(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching campaigns:", error);
      });
  };

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
        {campaigns.map((campaign) => (
          <div className="p-4" key={campaign.id}>
            <CampaignCard
              id={campaign.id}
              firstName={campaign.user.first_name}
              lastName={campaign.user.last_name}
              title={campaign.title}
              desc={campaign.description}
              days={calculateDaysLeft(campaign.deadline)}
              funded={
                (campaign.collected_amount / campaign.target_amount) * 100
              }
              img={`https://block-funders.haidarjbeily.com/public/storage/${campaign.image}`}
              profileImg={campaign.user.profile_picture}
              target_amount={campaign.target_amount}
              ethPrice={ethPriceInUsd}
              profile={true}
            />
          </div>
        ))}
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
