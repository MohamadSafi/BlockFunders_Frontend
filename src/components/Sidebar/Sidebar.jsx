import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Logoligo from "../../../public/imgs/logo.svg";
import Image from "next/image";

const IconSideNav = () => {
  return (
    <div className="text-slate-100 flex">
      <SideNav />
      {/* <div className="w-full">
        <div className="h-[35px] m-4 rounded border-2 border-dashed border-slate-600 bg-slate-800">
          Hello
        </div>
        <div className="h-[400px] m-4 rounded border-2 border-dashed border-slate-600 bg-slate-800">
          Hello again
        </div>
      </div> */}
    </div>
  );
};

const SideNav = () => {
  const [selected, setSelected] = useState(0);

  return (
    // NOTE: In prod, you'd likely set height to h-screen and fix to the viewport
    <nav className="h-screen w-fit bg-slate-950 p-4 flex flex-col items-center gap-2">
      <Image
        src={Logoligo}
        width="48"
        height="48"
        alt="Benefits"
        className={"object-cover"}
      />

      <NavItem
        selected={selected === 0}
        id={0}
        setSelected={setSelected}
        width={100}
      >
        <p>My Profile</p>
      </NavItem>
      <NavItem selected={selected === 1} id={1} setSelected={setSelected}>
        <p>My Campagins</p>
      </NavItem>
      <NavItem selected={selected === 2} id={2} setSelected={setSelected}>
        <p>Account Setting</p>
      </NavItem>
      <NavItem selected={selected === 3} id={3} setSelected={setSelected}>
        <p>Watchlist</p>
      </NavItem>
      <NavItem selected={selected === 4} id={4} setSelected={setSelected}>
        <p>Cash</p>
      </NavItem>
    </nav>
  );
};

const NavItem = ({ children, selected, id, setSelected }) => {
  return (
    <motion.button
      className="p-3 text-xl bg-slate-800 hover:bg-slate-700 rounded-md transition-colors relative"
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
