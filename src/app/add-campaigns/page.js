"use client";
import AddCampaignForm from "@/components/AddCampaign/AddCampaignForm";
import Footer from "@/components/Footer/Footer";
import { ResponsiveNavbar } from "@/components/navbar/Navbar";

export default function AddCampaign() {
  return (
    <div className="container mx-auto p-4 bg-[#fdf0e1]">
      <ResponsiveNavbar />
      <AddCampaignForm />
      <Footer />
    </div>
  );
}
