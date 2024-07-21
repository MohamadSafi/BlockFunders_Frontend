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
import { nftABI } from "../../../../public/contractABI/NFT_ABI";
import RewardCard from "@/components/Custom/rewardCard";

export default function Home() {
  const { token } = useContext(AuthContext);
  const { address, isConnected } = useAccount();
  const [rewards, setRewards] = useState([]);
  const [filteredRewards, setFilteredRewards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mintedId, setMintedId] = useState(null);
  const [filter, setFilter] = useState("all");
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const [publishedRewardIds, setPublishedRewardIds] = useState([]);

  useEffect(() => {
    const getRewards = async () => {
      if (token) {
        axios
          .get("https://block-funders.haidarjbeily.com/public/api/claims", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              with_paginate: 0,
            },
          })
          .then((response) => {
            console.log("Response", response);
            setRewards(response.data);
            setFilteredRewards(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching rewards:", error);
            setIsLoading(false);
          });
      }
    };
    getRewards();
  }, [token]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    if (newFilter === "all") {
      setFilteredRewards(rewards);
    } else {
      setFilteredRewards(
        rewards.filter((rewards) => rewards.status === newFilter)
      );
    }
  };

  const MintNFT = useCallback(
    async (id) => {
      const formData = new FormData();
      formData.append("tx_hash", hash);
      formData.append("_method", "PUT");
      console.log(hash);
      try {
        const response = await axios.post(
          `https://block-funders.haidarjbeily.com/public/api/claims/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        setPublishedRewardIds((prev) => [...prev, id]);
        alert(`NFT reward claimed successfully! Transaction Hash: ${hash}`);
      } catch (error) {
        console.error("Error publishing campaign:", error);
      }
    },
    [hash, token]
  );

  useEffect(() => {
    if (hash) {
      MintNFT(mintedId);
    }
  }, [hash, MintNFT, mintedId]);

  async function publish({ owner, id, uri }) {
    setMintedId(id);

    writeContract({
      address: "0x1634F2866E3a561f12aF62A8297D20E61a5058f2",
      abi: nftABI,
      functionName: "mint",
      args: [owner, id, uri],
    });
  }

  return (
    <main className="flex w-screen h-auto bg-[#f6f0eb]">
      <IconSideNav currentId={2} />
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
                <MDBBreadcrumbItem active>My Rewards</MDBBreadcrumbItem>
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
                  onClick={() => handleFilterChange("ready")}
                >
                  To Claim
                </MDBBtn>
                <MDBBtn
                  color={filter === "published" ? "primary" : "secondary"}
                  onClick={() => handleFilterChange("claimed")}
                >
                  Claimed
                </MDBBtn>
              </MDBBtnGroup>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol lg="12">
              {isLoading ? (
                <p>Loading...</p>
              ) : filteredRewards.length === 0 ? (
                <p>Currently you dont have any Rewards here.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredRewards.map((reward) => (
                    <div
                      key={reward.id}
                      className="flex gap-2 flex-col items-center "
                    >
                      <RewardCard
                        name={reward.metadata.name}
                        desc={reward.metadata.description}
                        dna={reward.metadata.dna}
                        img={reward.metadata.image}
                        status={reward.status}
                        id={reward.id}
                      />
                      {reward.status === "ready" &&
                        (isConnected ? (
                          <>
                            {!publishedRewardIds.includes(reward.id) && (
                              <Button
                                colorScheme="green"
                                className="w-full"
                                isLoading={isPending && mintedId === reward.id}
                                loadingText="Claiming.."
                                spinnerPlacement="start"
                                onClick={() =>
                                  publish({
                                    owner: address,
                                    id: reward.id,
                                    uri: `https://block-funders.haidarjbeily.com/public/api/nft_metadata/${reward.id}`,
                                  })
                                }
                              >
                                Claim Your NFT
                              </Button>
                            )}
                            {error && (
                              <div>
                                Error: {error.shortMessage || error.message}
                              </div>
                            )}
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
