// components/CampaignCard.js
export default function ProfileCampaignCard({
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
}) {
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-white rounded-2xl h-96 p-4 shadow-xl w-full">
      <img
        src={img}
        alt="Campaign"
        className="h-32 w-full object-cover rounded-t-2xl"
      />
      {profile ? (
        <></>
      ) : (
        <div className="flex items-center mt-4">
          <img src={profileImg} alt="User" className="h-10 w-10 rounded-full" />
          <span className="ml-2 text-lg font-semibold">
            {firstName} {lastName}
          </span>
        </div>
      )}

      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-gray-600">
        {profile ? truncateText(desc, 40) : desc}
      </p>
      <div className="mt-4">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-[#2e9df8] rounded-full"
            style={{ width: `${funded}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm font-semibold">
            {funded.toFixed(2)}% from {target_amount} ETH
          </span>
          <span className="text-sm text-gray-600">{days} days left</span>
        </div>
      </div>
    </div>
  );
}
