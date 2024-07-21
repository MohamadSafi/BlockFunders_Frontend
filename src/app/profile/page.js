"use client";
import IconSideNav from "@/components/Sidebar/Sidebar";
import React, { useContext, useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { Flex, Text, Link } from "@chakra-ui/react";
import AuthContext from "@/providers/AuthContext";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import axios from "axios";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Loader from "@/components/Custom/BarLoader";

export default function Home() {
  const { token } = useContext(AuthContext);
  const [username, setusername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (token) {
      axios
        .post(
          "https://block-funders.haidarjbeily.com/public/api/profile",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(async (response) => {
          console.log("Response", response);
          setusername(response.data.username);
          setFirstName(response.data.first_name);
          setLastName(response.data.last_name);
          setEmail(response.data.email);
          setImageUrl(response.data.profile_picture);
          setTransactions(response.data.transactions);
          setIsLoading(false);
          localStorage.setItem("userId", response.data.id.toString());
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [token]);

  const recentTransactions = transactions
    .filter((transaction) => Number(transaction.amount) > 0)
    .slice(-5)
    .reverse();

  const formatTransactionLink = (link) => {
    const parts = link.split("/");
    const hash = parts[parts.length - 1];
    return `${hash.slice(0, 6)}...${hash.slice(-6)}`;
  };

  return (
    <main className="flex w-screen h-auto bg-[#f6f0eb]">
      <IconSideNav currentId={0} />
      {isLoading ? (
        <Loader />
      ) : (
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
                  <MDBBreadcrumbItem active>My Profile</MDBBreadcrumbItem>
                </MDBBreadcrumb>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="flex flex-col text-center items-center">
                    <MDBCardImage
                      src={
                        imageUrl
                          ? imageUrl
                          : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      }
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: "150px" }}
                      fluid
                    />

                    <>
                      <p className="text-muted mb-2 mt-4">{username}</p>
                    </>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="8">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {firstName} {lastName}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {email}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Wallet Address</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <ConnectButton />
                      </MDBCol>
                    </MDBRow>
                    <hr />

                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Country</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">Russia</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol lg="12">
                <Text className="text-blue-gray-800 text-lg">
                  My latest Transactions:
                </Text>

                <MDBCard className="mb-4">
                  <MDBCardBody className="p-0">
                    <MDBListGroup flush className="rounded-3 min-h-44">
                      {recentTransactions.length === 0 ? (
                        <Text m={4}>No Transactions yet....</Text>
                      ) : (
                        recentTransactions.map((transaction) => (
                          <MDBListGroupItem
                            className="d-flex justify-content-between align-items-center p-3"
                            key={transaction.id}
                          >
                            <Flex
                              justifyContent={"space-between"}
                              p={0.3}
                              w={"full"}
                              alignContent={"center"}
                              alignItems={"center"}
                            >
                              <Text minW={"33%"} fontWeight={"bold"} margin={0}>
                                {/* {formatCampaignString(transaction.reason)} */}
                                {transaction.reason}
                              </Text>
                              {/* <Text className="text-sm text-gray-700">
                                {Number(transaction.amount).toFixed(2)} ETH
                              </Text> */}
                              <Link
                                key={transaction.id}
                                href={transaction.link}
                                isExternal
                                color="teal.500"
                                display="block"
                                mb={2}
                              >
                                {formatTransactionLink(transaction.link)}
                              </Link>
                            </Flex>
                          </MDBListGroupItem>
                        ))
                      )}
                    </MDBListGroup>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      )}
    </main>
  );
}
