import {
  ShieldCheckIcon,
  CurrencyDollarIcon,
  BoltIcon,
  KeyIcon,
  LinkIcon,
  GiftIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../../../public/imgs/home/benefit-one.svg";
import benefitTwoImg from "../../../public/imgs/home/benefit-two.svg";

const benefitOne = {
  title: "Empower Your Contributions with BlockFunders",
  desc: "BlockFunders leverages blockchain technology to provide a secure, efficient, and transparent crowdfunding platform. Experience the future of crowdfunding with the following features:",
  image: benefitOneImg,
  bullets: [
    {
      title: "Global Accessibility",
      desc: "Access the platform from anywhere in the world and contribute to campaigns seamlessly.",
      icon: <GlobeAltIcon />,
    },
    {
      title: "Cryptocurrency Donations",
      desc: "Donate and withdraw funds using cryptocurrencies, enabling fast and secure transactions.",
      icon: <CurrencyDollarIcon />,
    },
    {
      title: "Rewarding Top Donors",
      desc: "Receive exclusive NFTs as rewards for your top donations and contributions.",
      icon: <GiftIcon />,
    },
  ],
};

const benefitTwo = {
  title: "More Exceptional Benefits",
  desc: "BlockFunders offers additional features that set us apart from traditional crowdfunding platforms. Discover the advantages that make BlockFunders your top choice for crowdfunding:",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Verified Campaigns",
      desc: "Benefit from our KYC system to ensure that all campaigns are legitimate and trustworthy.",
      icon: <ShieldCheckIcon />,
    },
    {
      title: "Decentralized Network",
      desc: "Enjoy the reliability and transparency of a decentralized network, reducing the risk of central points of failure.",
      icon: <LinkIcon />,
    },

    {
      title: "Robust Security",
      desc: "Leverage the robust security features of blockchain technology to ensure your data and transactions are always protected.",
      icon: <KeyIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
