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
import AuthContext from "@/providers/AuthContext";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
          setusername(response.data.username);
          setFirstName(response.data.first_name);
          setLastName(response.data.last_name);
          setEmail(response.data.email);
          setImageUrl(response.data.profile_picture);
          setIsLoading(false);
          await AsyncStorage.setItem("userId", response.data.id.toString());
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [token]);

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
                      <div className="d-flex justify-content-center mb-2">
                        <MDBBtn outline className="ms-1">
                          Change password
                        </MDBBtn>
                      </div>
                    </>
                  </MDBCardBody>
                </MDBCard>

                <MDBCard className="mb-4 mb-lg-0">
                  <MDBCardBody className="p-0">
                    <MDBListGroup flush className="rounded-3">
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fas icon="globe fa-lg text-warning" />
                        <MDBCardText>--</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon
                          fab
                          icon="github fa-lg"
                          style={{ color: "#333333" }}
                        />
                        <MDBCardText>--</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon
                          fab
                          icon="twitter fa-lg"
                          style={{ color: "#55acee" }}
                        />
                        <MDBCardText>--</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon
                          fab
                          icon="instagram fa-lg"
                          style={{ color: "#ac2bac" }}
                        />
                        <MDBCardText>--</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon
                          fab
                          icon="facebook en-lg"
                          style={{ color: "#3b5998" }}
                        />
                        <MDBCardText>--</MDBCardText>
                      </MDBListGroupItem>
                    </MDBListGroup>
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
            </MDBRow>
          </MDBContainer>
        </div>
      )}
    </main>
  );
}
