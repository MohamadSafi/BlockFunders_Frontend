import { useRouter } from "next/navigation";

export default function RewardCard({ name, desc, dna, img, status, id }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/reward/${id}`);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div
      onClick={status !== "ready" ? handleClick : null}
      className="bg-white rounded-2xl h-fit p-4 shadow-xl w-full cursor-pointer"
    >
      <img
        src={img}
        alt="Campaign"
        className="h-64 w-full object-cover rounded-t-2xl"
      />

      <h3 className="mt-4 text-xl font-bold">{name}</h3>
      <p className="mt-2 text-gray-600">{truncateText(desc, 40)}</p>
      <div className="mt-4">
        <div className=" rounded-full">{dna}</div>
      </div>
    </div>
  );
}
