import { useRouter } from "next/navigation";

export default function CampaignCard({
  firstName,
  lastName,
  title,
  desc,
  days,
  funded,
  target_amount,
  img,
  profileImg,
  profile = false,
  id,
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/campaign/${id}`); // Navigate to the campaign route with the id
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-2xl h-fit p-4 shadow-xl w-full cursor-pointer ${
        profile ? "min-h-90" : ""
      }`}
    >
      <img
        src={img}
        alt="Campaign"
        className="h-64 w-full object-cover rounded-t-2xl"
      />
      <div className="flex items-center mt-4">
        <img src={profileImg} alt="User" className="h-10 w-10 rounded-full" />
        <span className="ml-2 text-lg font-semibold">
          {firstName} {lastName}
        </span>
      </div>

      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-gray-600">{truncateText(desc, 130)}</p>
      <div className="mt-4">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-[#2e9df8] rounded-full"
            style={{ width: `${funded}%`, maxWidth: "100%" }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm font-semibold">
            {funded.toFixed(2)}% from {target_amount} ETH
          </span>
          <span className="text-sm text-gray-600">{days + 300} days left</span>
        </div>
      </div>
    </div>
  );
}
