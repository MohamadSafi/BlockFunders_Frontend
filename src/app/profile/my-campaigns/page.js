"use client";
import IconSideNav from "@/components/Sidebar/Sidebar";
import React, { useContext, useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import axios from "axios";
import AuthContext from "@/providers/AuthContext";
import CampaignCard from "@/components/Custom/CampaignCard";

export default function Home() {
  const { token } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios
        .get("https://block-funders.haidarjbeily.com/public/api/campaigns", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            with_paginate: 0,
          },
        })
        .then((response) => {
          setCampaigns(response.data.data);

          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching campaigns:", error);
          setIsLoading(false);
        });
    }
  }, [token]);

  return (
    <main className="flex w-screen h-auto bg-[#f6f0eb]">
      <IconSideNav currentId={1} />
      <div className="w-full bg-[#f6f0eb]">
        <MDBContainer className="py-5 w-full">
          <MDBRow>
            <MDBCol>
              <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                <MDBBreadcrumbItem>
                  <a href="/">Home</a>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem>
                  <a href="#">User</a>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>My Campaigns</MDBBreadcrumbItem>
              </MDBBreadcrumb>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol lg="12">
              {isLoading ? (
                <p>Loading...</p>
              ) : campaigns.length === 0 ? (
                <p>Currently you don't have any Campaigns</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {campaigns.map((campaign) => (
                    <CampaignCard
                      key={campaign.id}
                      username={campaign.username}
                      title={campaign.title}
                      desc={campaign.description}
                      days={campaign.days_left}
                      funded={
                        (campaign.collected_amount / campaign.target_amount) *
                        100
                      }
                      img={"/imgs/home/camp1.png"}
                      profileImg={"/imgs/home/profile1.png"}
                    />
                  ))}
                </div>
              )}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </main>
  );
}
