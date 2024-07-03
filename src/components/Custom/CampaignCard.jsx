export default function CampaignCard({
  username,
  title,
  desc,
  days,
  funded,
  img,
  profileImg,
}) {
  return (
    <div className="bg-[#edf2f6] rounded-2xl h-96 p-4">
      <img
        src={img}
        alt="Campaign"
        className="h-32 w-full object-cover rounded-t-2xl"
      />
      <div className="flex items-center mt-4">
        <img src={profileImg} alt="User" className="h-10 w-10 rounded-full" />
        <span className="ml-2 text-lg font-semibold">{username}</span>
      </div>
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-gray-600">{desc}</p>
      <div className="mt-4">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-[#2e9df8] rounded-full"
            style={{ width: `${funded}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm font-semibold">{funded}% funded</span>
          <span className="text-sm text-gray-600">{days} days left</span>
        </div>
      </div>
    </div>
  );
}
