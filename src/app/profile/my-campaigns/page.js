"use client";
import IconSideNav from "@/components/Sidebar/Sidebar";
import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import axios from "axios";
import AuthContext from "@/providers/AuthContext";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { contractABI } from "../../../../public/contractABI/contractABI";
import ProfileCampaignCard from "@/components/Custom/profileCampainCard";

export default function Home() {
  const { token } = useContext(AuthContext);
  const { address, isConnected } = useAccount();
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [publishedId, setPublishedId] = useState(null);
  const [filter, setFilter] = useState("all");
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const [publishedCampaignIds, setPublishedCampaignIds] = useState([]);

  useEffect(() => {
    const getCamps = async () => {
      if (token) {
        const id = localStorage.getItem("userId");
        axios
          .get("https://block-funders.haidarjbeily.com/public/api/campaigns", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              with_paginate: 0,
              user_id: id,
            },
          })
          .then((response) => {
            setCampaigns(response.data.data);
            setFilteredCampaigns(response.data.data); // Set the filtered campaigns initially to all campaigns
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching campaigns:", error);
            setIsLoading(false);
          });
      }
    };
    getCamps();
  }, [token]);

  const calculateDaysLeft = (deadline) => {
    const now = new Date().getTime();
    const timeLeft = deadline - now;
    return Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    if (newFilter === "all") {
      setFilteredCampaigns(campaigns);
    } else {
      setFilteredCampaigns(
        campaigns.filter((campaign) => campaign.status === newFilter)
      );
    }
  };

  console.log(campaigns);

  const publishCampaign = useCallback(
    async (id) => {
      console.log("I am inside the callback");
      const formData = new FormData();
      formData.append("tx_hash", hash);
      formData.append("_method", "PUT");
      console.log(hash);
      try {
        const response = await axios.post(
          `https://block-funders.haidarjbeily.com/public/api/campaigns/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        setPublishedCampaignIds((prev) => [...prev, id]);
        alert(`Campaign published successfully! Transaction Hash: ${hash}`);
      } catch (error) {
        console.error("Error publishing campaign:", error);
      }
    },
    [hash, token]
  );

  useEffect(() => {
    if (hash) {
      publishCampaign(publishedId);
    }
  }, [hash, publishCampaign, publishedId]);

  async function publish({
    id,
    owner,
    title,
    description,
    targetMoney,
    deadline,
    imageUrl,
  }) {
    const campaignId = Number(id);
    setPublishedId(id);
    writeContract({
      address: "0x1bbb0896aC6F4E32a89157C73Fb830325a441cb9",
      abi: contractABI,
      functionName: "createCampaign",
      args: [
        campaignId,
        owner,
        title,
        description,
        targetMoney,
        deadline,
        imageUrl,
      ],
    });
  }

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

          <MDBRow className="mb-4">
            <MDBCol>
              <MDBBtnGroup>
                <MDBBtn
                  color={filter === "all" ? "primary" : "secondary"}
                  onClick={() => handleFilterChange("all")}
                >
                  All
                </MDBBtn>
                <MDBBtn
                  color={filter === "draft" ? "primary" : "secondary"}
                  onClick={() => handleFilterChange("draft")}
                >
                  Draft
                </MDBBtn>
                <MDBBtn
                  color={filter === "published" ? "primary" : "secondary"}
                  onClick={() => handleFilterChange("published")}
                >
                  Published
                </MDBBtn>
              </MDBBtnGroup>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol lg="12">
              {isLoading ? (
                <p>Loading...</p>
              ) : filteredCampaigns.length === 0 ? (
                <p>Currently you dont have any campaigns here.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredCampaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="flex gap-2 flex-col items-center "
                    >
                      <ProfileCampaignCard
                        profile={true}
                        key={campaign.id}
                        firstName={campaign.user.first_name}
                        lastName={campaign.user.last_name}
                        title={campaign.title}
                        desc={campaign.description}
                        days={calculateDaysLeft(campaign.deadline)}
                        funded={
                          (campaign.collected_amount / campaign.target_amount) *
                          100
                        }
                        target_amount={campaign.target_amount}
                        img={`https://block-funders.haidarjbeily.com/public/storage/${campaign.image}`}
                        profileImg={"/imgs/home/profile1.png"}
                      />
                      {campaign.status === "draft" &&
                        (isConnected ? (
                          <>
                            {!publishedCampaignIds.includes(campaign.id) && (
                              <Button
                                colorScheme="green"
                                className="w-full"
                                isLoading={
                                  isPending && publishedId === campaign.id
                                }
                                loadingText="Publishing"
                                spinnerPlacement="start"
                                onClick={() =>
                                  publish({
                                    id: campaign.id,
                                    owner: address,
                                    title: campaign.title,
                                    description: campaign.description,
                                    targetMoney: Number(campaign.target_amount),
                                    deadline: campaign.deadline,
                                    imageUrl: `https://block-funders.haidarjbeily.com/public/storage/${campaign.image}`,
                                  })
                                }
                              >
                                Publish
                              </Button>
                            )}
                            {/* {error && (
                              <div>
                                Error: {error.shortMessage || error.message}
                              </div>
                            )} */}
                          </>
                        ) : (
                          <ConnectButton label="Connect Wallet to Publish" />
                        ))}
                    </div>
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
