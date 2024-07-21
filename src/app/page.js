"use client";
import Footer from "@/components/Footer/Footer";
import Benefits from "@/components/Home/Benefits";
import React, { useContext } from "react";
import FeaturedSection from "@/components/Home/Featured";
import { benefitOne, benefitTwo } from "../components/Home/Data";
import ShuffleHero from "@/components/Home/Hero";
import { ResponsiveNavbar } from "@/components/navbar/Navbar";
import AuthContext from "@/providers/AuthContext";
import Loader from "@/components/Custom/BarLoader";

export default function Home() {
  const { token } = useContext(AuthContext);

  return (
    <main className="w-screen h-auto p-4 bg-[#fdf0e1]">
      {/* {token ? ( */}
      <>
        <ResponsiveNavbar />
        <ShuffleHero />
        <FeaturedSection />
        <Benefits data={benefitOne} />
        <Benefits imgPos="right" data={benefitTwo} />
        <Footer />
      </>
      {/* ) : ( */}
      {/* <Loader /> */}
      {/* )} */}
    </main>
  );
}
