"use client";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import { ResponsiveNavbar } from "@/components/navbar/Navbar";
import Camp from "@/components/campaign/camp";
import { useState, useEffect, useContext } from "react";
import AuthContext from "@/providers/AuthContext";
import axios from "axios";
import Loader from "@/components/Custom/BarLoader";

export default function CampaignPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [campaign, setCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const calculateDaysLeft = (deadline) => {
    const now = new Date().getTime();
    const timeLeft = deadline - now;
    return Math.ceil(timeLeft / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  };

  useEffect(() => {
    const fetchCampaigns = () => {
      setIsLoading(true);
      axios
        .get(
          `https://block-funders.haidarjbeily.com/public/api/campaigns/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          setCampaign(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching campaign:", error);
          setIsLoading(false);
        });
    };

    fetchCampaigns();
  }, [id, token]);

  if (isLoading) {
    return <Loader />;
  }

  if (!campaign) {
    return <p>No campaign found.</p>;
  }

  const daysLeft = calculateDaysLeft(campaign.deadline);

  return (
    <main className="w-screen h-auto bg-[#fdf0e1]">
      <ResponsiveNavbar />
      <div className="flex w-full justify-center mt-16">
        <Camp
          firstName={campaign.user.first_name}
          lastName={campaign.user.last_name}
          title={campaign.title}
          desc={campaign.description}
          days={daysLeft}
          funded={Number(campaign.collected_amount)}
          target_amount={Number(campaign.target_amount)}
          img={`https://block-funders.haidarjbeily.com/public/storage/${campaign.image}`}
          profileImg={campaign.user.profile_picture}
          id={campaign.id}
          transactions={campaign.transactions}
        />
      </div>
      <Footer />
    </main>
  );
}
