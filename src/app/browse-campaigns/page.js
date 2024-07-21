"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import CampaignCard from "@/components/Custom/CampaignCard";
import { ResponsiveNavbar } from "@/components/navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AuthContext from "@/providers/AuthContext";
import Loader from "@/components/Custom/BarLoader";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { fetchEthPriceInUsd } from "@/utils/ethToUsd";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationLinks, setPaginationLinks] = useState([]);
  const { token } = useContext(AuthContext);
  const [ethPriceInUsd, setEthPriceInUsd] = useState(0);

  useEffect(() => {
    const getEthPrice = async () => {
      const price = await fetchEthPriceInUsd();
      if (price !== null) {
        console.log("Price", price);
        setEthPriceInUsd(price);
      }
    };
    getEthPrice();
  }, []);

  useEffect(() => {
    fetchCampaigns(currentPage);
  }, [currentPage, token]);

  const fetchCampaigns = (page) => {
    setIsLoading(true);
    axios
      .get("https://block-funders.haidarjbeily.com/public/api/campaigns", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          with_paginate: 1,
          per_page: 6,
          page: page,
          q: "published",
        },
      })
      .then((response) => {
        setCampaigns(response.data.data);
        setPaginationLinks(response.data.meta.links);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching campaigns:", error);
        setIsLoading(false);
      });
  };

  const handlePageChange = (url) => {
    if (url) {
      const urlParams = new URL(url).searchParams;
      const page = urlParams.get("page");
      setCurrentPage(parseInt(page));
    }
  };

  if (isLoading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-[#fdf0e1]">
      <ResponsiveNavbar />
      <div className="flex flex-col min-w-full justify-around mt-16">
        <h2 className="gradient-text2 text-3xl font-semibold text-center">
          Take a Look at our Campaigns
        </h2>
        <div className="flex justify-center mx-4 md:mx-16 xl:mx-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 mt-16 md:min-w-full">
            {campaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                id={campaign.id}
                firstName={campaign.user.first_name}
                lastName={campaign.user.last_name}
                title={campaign.title}
                desc={campaign.description}
                days={campaign.days_left}
                funded={
                  ((campaign.collected_amount * ethPriceInUsd) /
                    campaign.target_amount) *
                  100
                }
                target_amount={campaign.target_amount}
                img={`https://block-funders.haidarjbeily.com/public/storage/${campaign.image}`}
                profileImg={campaign.user.profile_picture}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() =>
              handlePageChange(
                paginationLinks.find(
                  (link) => link.label === "&laquo; Previous"
                ).url
              )
            }
            // disabled={
            //   !paginationLinks.find((link) => link.label === "&laquo; Previous")
            //     .url
            // }
            className="px-4 py-2 mx-2 bg-gray-200 rounded"
          >
            <ArrowBackIos />
          </button>
          {paginationLinks
            .filter((link) => !isNaN(link.label))
            .map((link, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(link.url)}
                className={`px-4 py-2 mx-2 rounded ${
                  link.active ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {link.label}
              </button>
            ))}
          <button
            onClick={() =>
              handlePageChange(
                paginationLinks.find((link) => link.label === "Next &raquo;")
                  .url
              )
            }
            // disabled={
            //   !paginationLinks.find((link) => link.label === "Next &raquo;").url
            // }
            className="px-4 py-2 mx-2 bg-gray-200 rounded"
          >
            <ArrowForwardIos />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
