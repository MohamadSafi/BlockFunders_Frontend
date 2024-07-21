import { AnimatePresence, motion } from "framer-motion";
import { useState, useContext } from "react";
import Logoligo from "../../../public/imgs/logo.svg";
import AuthContext from "@/providers/AuthContext";
import Image from "next/image";
import Link from "next/link";

const IconSideNav = ({ currentId }) => {
  return (
    <div className="text-slate-100 flex bg-white rounded-xl">
      <SideNav selectedId={currentId} />
    </div>
  );
};

const SideNav = ({ selectedId }) => {
  const [selected, setSelected] = useState(selectedId);
  const { logout } = useContext(AuthContext);

  return (
    <nav className="h-screen w-fit bg-slate-950 p-4 flex flex-col items-center justify-between">
      <div className="flex flex-col items-center">
        <a href="/">
          <Image
            src={Logoligo}
            width="48"
            height="48"
            alt="Logo"
            className={"object-cover"}
          />
        </a>

        <div className=" flex flex-col mt-8 gap-2">
          <NavItem
            selected={selected === 0}
            id={0}
            setSelected={setSelected}
            width={100}
          >
            <a href="/profile">
              <p className="m-1 text-gray-800">My Profile</p>
            </a>
          </NavItem>
          <NavItem selected={selected === 1} id={1} setSelected={setSelected}>
            <a href="/profile/my-campaigns">
              <p className="m-1 text-gray-800">My Campaigns</p>
            </a>
          </NavItem>
          <NavItem selected={selected === 2} id={2} setSelected={setSelected}>
            <a href="/profile/my-rewards">
              <p className="m-1 text-gray-800">My Rewards</p>
            </a>
          </NavItem>
          {/* <Link href="/profile/account-setting" passHref>
            <NavItem selected={selected === 2} id={2} setSelected={setSelected}>
              <p className="m-1 text-gray-800">Account Setting</p>
            </NavItem>
          </Link>

          <Link href="/profile/watchlist" passHref>
            <NavItem selected={selected === 3} id={3} setSelected={setSelected}>
              <p className="m-1 text-gray-800">Watchlist</p>
            </NavItem>
          </Link>
          <Link href="/profile/cash" passHref>
            <NavItem selected={selected === 4} id={4} setSelected={setSelected}>
              <p className="m-1 text-gray-800">Cash</p>
            </NavItem>
          </Link> */}
        </div>
      </div>
      <div>
        <motion.button
          className="flex p-2 text-md bg-slate-800 hover:bg-slate-700 rounded-md transition-colors relative min-w-44 items-center justify-center"
          onClick={() => logout()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="block relative z-10 text-white">Log out</span>
          <AnimatePresence>
            <motion.span
              className="absolute inset-0 rounded-md bg-[#bf4141d6] z-0 min-w-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            ></motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </nav>
  );
};

const NavItem = ({ children, selected, id, setSelected }) => {
  return (
    <motion.button
      className="flex p-2 text-md bg-slate-800 hover:bg-slate-700 rounded-md transition-colors relative min-w-44 items-start"
      onClick={() => setSelected(id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="block relative z-10">{children}</span>
      <AnimatePresence>
        {selected && (
          <motion.span
            className="absolute inset-0 rounded-md bg-[#7cbbff] z-0 min-w-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          ></motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default IconSideNav;
