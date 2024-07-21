"use client";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import { ResponsiveNavbar } from "@/components/navbar/Navbar";
import { useState, useEffect, useContext } from "react";
import AuthContext from "@/providers/AuthContext";
import axios from "axios";
import Loader from "@/components/Custom/BarLoader";
import { Box, Heading, Image, Text, Flex } from "@chakra-ui/react";

export default function RewardPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [reward, setReward] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const parseMetadata = (metadata) => {
    if (metadata) {
      if (typeof metadata === "string") {
        try {
          return JSON.parse(metadata);
        } catch (error) {
          console.error("Error parsing metadata:", error);
          return {};
        }
      }
    }
    return metadata;
  };

  useEffect(() => {
    const fetchReward = () => {
      setIsLoading(true);
      axios
        .get(`https://block-funders.haidarjbeily.com/public/api/claims/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          const fetchedReward = response.data;
          setReward(fetchedReward);
          setMetadata(parseMetadata(fetchedReward.metadata));
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching Reward:", error);
          setIsLoading(false);
        });
    };

    if (id && token) {
      fetchReward();
    }
  }, [id, token]);

  if (isLoading) {
    return <Loader />;
  }

  if (!reward) {
    return <p>No Such Reward found.</p>;
  }
  console.log(metadata);
  return (
    <main className="w-screen h-auto bg-[#fdf0e1]">
      <ResponsiveNavbar />
      <div className="flex w-full justify-center mt-16">
        <Box overflow="hidden" p={5} maxW={"70%"}>
          <Heading as="h3" size="lg" mb={4}>
            {metadata.name}
          </Heading>
          <Box flex="2" mr={4}>
            <Flex flexDir={"row"} gap={8}>
              <Image
                src={metadata.image}
                alt="title"
                borderRadius="md"
                w={520}
              />

              <Box
                flex="1"
                backgroundColor={"white"}
                borderRadius={10}
                boxShadow={"md"}
                p={8}
              >
                <Heading as="h4" size="md" mb={4} fontWeight={"bold"}>
                  Attributes
                </Heading>
                {metadata.attributes && metadata.attributes.length > 0 ? (
                  metadata.attributes.map((attr, index) => (
                    <Box key={index} mb={4}>
                      <Text fontWeight="bold">{attr.trait_type}:</Text>
                      <Text className="text-gray-900">{attr.trait_value}</Text>
                    </Box>
                  ))
                ) : (
                  <Text>No attributes available</Text>
                )}
              </Box>
            </Flex>
            <hr className="h-0.5 bg-gray-400 mt-4" />
            <Text mx={4} mt={4} fontWeight={"bold"} fontSize={"large"}>
              Description:
            </Text>
            <Text mx={4} className="text-gray-800">
              {metadata.description}
            </Text>
            <Text mx={4} mt={4} fontWeight={"bold"}>
              NFT DNA:
            </Text>
            <Text mx={4} className="text-gray-800">
              {metadata.dna}
            </Text>
          </Box>
        </Box>
      </div>
      <Footer />
    </main>
  );
}
