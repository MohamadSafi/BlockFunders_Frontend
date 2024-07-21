import { Button } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useWriteContract } from "wagmi";
import { contractABI } from "../../../public/contractABI/contractABI";

export default function PublishButton({
  owner,
  title,
  description,
  targetMoney,
  deadline,
  imageUrl,
}) {
  const { data: hash, isPending, writeContract } = useWriteContract();

  async function publish() {
    writeContract({
      address: "0xf891cDD558eBfbd9Ea9e4B14B34f42CC13e51a10",
      abi: contractABI,
      functionName: "createCampaign",
      args: [owner, title, description, targetMoney, deadline, imageUrl],
    });
  }

  return (
    <Button colorScheme="green" className="w-full" onClick={publish()}>
      Publish
    </Button>
  );
}
