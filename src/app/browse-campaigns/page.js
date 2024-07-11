"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CampaignCard from "@/components/Custom/CampaignCard";
import { ResponsiveNavbar } from "@/components/navbar/Navbar";
import { FoodBank } from "@mui/icons-material";
import Footer from "@/components/Footer/Footer";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://block-funders.haidarjbeily.com/public/api/campaigns")
      .then((response) => {
        setCampaigns(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching campaigns:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="loader">Loading...</div>; // You can customize this loader
  }

  return (
    <div className="container mx-auto p-4">
      <ResponsiveNavbar />
      <h1 className="text-2xl font-bold mb-4">Browse Campaigns</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            username={campaign.username}
            title={campaign.title}
            desc={campaign.description}
            days={campaign.days_left}
            funded={(campaign.collected_amount / campaign.target_amount) * 100}
            img={campaign.image_url}
            profileImg={campaign.profile_image_url}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
