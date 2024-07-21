"use client";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import AuthContext from "@/providers/AuthContext";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Text,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import {
  MdTitle,
  MdWork,
  MdOutlineCurrencyBitcoin,
  MdDateRange,
} from "react-icons/md";
import { fetchEthPriceInUsd } from "@/utils/ethToUsd";

export default function AddCampaignForm() {
  const [ethPriceInUsd, setEthPriceInUsd] = useState(0);
  const [usdEquivalent, setUsdEquivalent] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target_amount: "",
    deadline: null,
    image: null,
  });
  const { token } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const getEthPrice = async () => {
      const price = await fetchEthPriceInUsd();
      if (price !== null) {
        setEthPriceInUsd(price);
      }
    };
    getEthPrice();
  }, []);

  const handleTargetAmountChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setUsdEquivalent(value * ethPriceInUsd);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else if (name === "deadline") {
      setFormData({ ...formData, deadline: new Date(value).getTime() });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category_id", 1);
    data.append("target_amount", formData.target_amount);
    data.append("deadline", formData.deadline);
    data.append("collected_amount", 0);
    data.append("status", "draft");
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        "https://block-funders.haidarjbeily.com/public/api/campaigns",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Campaign added successfully:", response.data);
      router.push("/profile/my-campaigns");
    } catch (error) {
      console.error("Error adding campaign:", error);
      alert("Error adding campaign. Please try again.");
    }
  };

  return (
    <>
      <Box maxW="800px" mx="auto" mt="5" p="5" className="text-black">
        <Text
          fontSize="6xl"
          fontWeight="bold"
          bgGradient="linear(to-r, purple.300, blue.500)"
          bgClip="text"
        >
          Add a new Campaign!
        </Text>
        <form
          onSubmit={handleSubmit}
          // className=" border-2 border-gray-700 p-8 rounded-md"
        >
          <VStack spacing={6} align="stretch">
            <FormControl id="jobTitle" isRequired className="mt-8">
              <FormLabel>Campaign Title</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdTitle color="gray" />
                </InputLeftElement>
                <Input
                  name="title"
                  placeholder="Enter Campaign title"
                  onChange={handleChange}
                  _placeholder={{ opacity: 1, color: "gray.600" }}
                  borderColor={"gray.500"}
                />
              </InputGroup>
            </FormControl>

            <FormControl id="jobDescription" isRequired>
              <FormLabel>Campaign Description</FormLabel>
              <Textarea
                name="description"
                placeholder="Enter Campaign description"
                onChange={handleChange}
                className="min-h-44"
                _placeholder={{ opacity: 1, color: "gray.600" }}
                borderColor={"gray.500"}
              />
            </FormControl>

            <FormControl id="image">
              <FormLabel>Upload Image</FormLabel>
              <Input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                p={1}
                _placeholder={{ opacity: 1, color: "gray.600" }}
                borderColor={"gray.500"}
              />
            </FormControl>

            <FormControl id="budget" isRequired>
              <FormLabel>Target Amount in ETH</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdOutlineCurrencyBitcoin color="gray" />
                </InputLeftElement>
                <Input
                  name="target_amount"
                  type="number"
                  placeholder="Enter Target Amount"
                  onChange={handleTargetAmountChange}
                  _placeholder={{ opacity: 1, color: "gray.600" }}
                  borderColor={"gray.500"}
                />
              </InputGroup>
              <Text mt={2} className="text-gray-800">
                ~${usdEquivalent.toFixed(2)} USD
              </Text>
            </FormControl>

            <FormControl id="deadline" isRequired>
              <FormLabel>Deadline</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdDateRange color="gray" />
                </InputLeftElement>
                <Input
                  name="deadline"
                  type="date"
                  onChange={handleChange}
                  _placeholder={{ opacity: 1, color: "gray.600" }}
                  borderColor={"gray.500"}
                />
              </InputGroup>
            </FormControl>

            <Button
              colorScheme="teal"
              size="lg"
              type="submit"
              bg={"#3a82d0"}
              sx={{
                "&:hover": {
                  bg: "#135fb0",
                },
                "&:focus": {
                  bg: "#135fb0",
                },
              }}
            >
              Post Campaign
            </Button>
          </VStack>
        </form>
      </Box>
      <Box position="absolute" top="5%" left="5px" width={"20%"} zIndex={-10}>
        <img
          src="./imgs/addForm/first.svg"
          alt="Your SVG"
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
      <Box position="absolute" top="37%" right="5px" width={"20%"} zIndex={-10}>
        <img
          src="./imgs/addForm/second.svg"
          alt="Your SVG"
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
    </>
  );
}
