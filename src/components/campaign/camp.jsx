import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Progress,
  Text,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import AuthContext from "@/providers/AuthContext";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { contractABI } from "../../../public/contractABI/contractABI";
import { fetchEthPriceInUsd } from "@/utils/ethToUsd";

export default function Camp({
  firstName,
  lastName,
  title,
  desc,
  days,
  funded,
  target_amount,
  img,
  profileImg,
  transactions,
  id,
}) {
  const { address, isConnected } = useAccount();
  const { token } = useContext(AuthContext);
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [donationAmount, setDonationAmount] = useState("");
  const [isThankYouVisible, setIsThankYouVisible] = useState(false);
  const [ethPriceInUsd, setEthPriceInUsd] = useState(0);
  const [usdEquivalent, setUsdEquivalent] = useState(0);

  useEffect(() => {
    const getEthPrice = async () => {
      const price = await fetchEthPriceInUsd();
      if (price !== null) {
        setEthPriceInUsd(price);
      }
    };
    getEthPrice();
  }, []);

  const formatTransactionLink = (link) => {
    const parts = link.split("/");
    const hash = parts[parts.length - 1];
    return `${hash.slice(0, 6)}...${hash.slice(-6)}`;
  };

  const recentTransactions = transactions
    .filter((transaction) => Number(transaction.amount) > 0)
    .slice(-5)
    .reverse();

  const submitDonate = useCallback(
    async (id) => {
      const formData = new FormData();
      formData.append("tx_hash", hash);
      formData.append("amount", donationAmount);
      try {
        const response = await axios.post(
          `https://block-funders.haidarjbeily.com/public/api/campaigns/${id}/fund`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        setIsThankYouVisible(true);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [hash, token, donationAmount]
  );

  useEffect(() => {
    if (hash) {
      submitDonate(id);
    }
  }, [hash, submitDonate, id]);

  const handleDonation = () => {
    const donationAmountInWei = BigInt(donationAmount * 10 ** 18);
    const numberId = Number(id);
    console.log(numberId);
    console.log(typeof numberId);
    writeContract({
      address: "0xf891cDD558eBfbd9Ea9e4B14B34f42CC13e51a10",
      abi: contractABI,
      functionName: "donateToCampaign",
      args: [numberId],
      overrides: {
        value: donationAmountInWei,
      },
    });
  };

  const handleDonationAmountChange = (e) => {
    const amount = e.target.value;
    setDonationAmount(amount);
    setUsdEquivalent(amount * ethPriceInUsd);
  };

  const closeModal = () => {
    onClose();
    setIsThankYouVisible(false); // Reset thank you message visibility
    setDonationAmount(""); // Reset donation amount
    setUsdEquivalent(0); // Reset USD equivalent
  };

  return (
    <Box overflow="hidden" p={5} maxW={"70%"}>
      <Heading as="h3" size="lg" mb={4}>
        {title}
      </Heading>
      <Flex gap={8}>
        <Box flex="2" mr={4}>
          <Image src={img} alt={title} borderRadius="md" mb={4} />
          <Flex alignItems="center" mb={4}>
            <Image
              src={profileImg}
              alt={`${firstName} ${lastName}`}
              borderRadius="full"
              boxSize="50px"
              mr={3}
            />
            <Text fontWeight="bold">
              {firstName} {lastName}
            </Text>
          </Flex>
          <hr className="h-0.5 bg-gray-400" />
          <Text m={4}>{desc}</Text>
          {error && <div>Error: {error.message}</div>}
        </Box>
        <Box
          flex="1"
          backgroundColor={"white"}
          borderRadius={10}
          boxShadow={"md"}
          p={8}
          className="max-h-96"
        >
          <Text
            as="kbd"
            fontWeight="bold"
            mb={2}
            fontSize={"xl"}
            className="leading-10"
          >
            ${(funded * ethPriceInUsd).toFixed(2)}
            <span className="font-sans text-xs text-gray-700">
              {" "}
              raised of ${target_amount.toFixed(2)}
            </span>
          </Text>
          <Progress
            value={((funded * ethPriceInUsd) / target_amount) * 100}
            colorScheme="green"
            borderRadius={10}
          />
          <Text textAlign={"end"}>
            <span className="font-bold text-sm"> {days}</span>{" "}
            <span className="text-xs text-gray-700"> days left</span>
          </Text>
          {isConnected ? (
            <Button
              colorScheme="green"
              className="w-full my-2"
              onClick={onOpen}
              isLoading={isPending}
            >
              Donate
            </Button>
          ) : (
            <ConnectButton label="Connect Wallet to Donate" />
          )}

          <hr className="h-0.5 mt-1 bg-gray-400" />
          <Box mt={4}>
            <Text fontWeight="bold" mb={2}>
              Latest Donations:
            </Text>
            {recentTransactions.length === 0 ? (
              <Text>No donations yet.</Text>
            ) : (
              recentTransactions.map((transaction) => (
                <Flex
                  justifyContent={"space-between"}
                  key={transaction.id}
                  p={0.3}
                >
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
                  <Text className="text-sm text-gray-700">
                    {Number(transaction.amount).toFixed(2)} ETH
                  </Text>
                </Flex>
              ))
            )}
          </Box>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isThankYouVisible ? "Thank You!" : "Donate"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isThankYouVisible ? (
              <Text>Thank you for your donation!</Text>
            ) : (
              <>
                <Text mb={2}>Enter the amount of ETH you want to donate:</Text>
                <Input
                  placeholder="Amount in ETH"
                  value={donationAmount}
                  onChange={handleDonationAmountChange}
                  type="number"
                  step="0.01"
                />
                <Text mt={2}>~${usdEquivalent.toFixed(2)} USD</Text>
              </>
            )}
          </ModalBody>

          {!isThankYouVisible && (
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handleDonation}
                isLoading={isPending}
              >
                Confirm Donation
              </Button>
              <Button variant="ghost" onClick={closeModal}>
                Cancel
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
}
