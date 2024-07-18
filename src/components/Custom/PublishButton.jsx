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
      address: "0x785371Bcf0f3629D5D58b6f801af981696e08a85",
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
