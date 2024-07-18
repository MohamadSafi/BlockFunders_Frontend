"use client";
import React, { useContext } from "react";
import { Typography, MenuItem } from "@material-tailwind/react";
import {
  BanknotesIcon,
  MagnifyingGlassIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import NavListMenu from "./NavListMenu";
import AuthContext from "@/providers/AuthContext";

const navListItems = [
  {
    label: "Raise Capital",
    icon: BanknotesIcon,
    nav: "/add-campaigns",
  },
  {
    label: "Browse campaigns",
    icon: MagnifyingGlassIcon,
    nav: "/browse-campaigns",
  },
  {
    label: "About us",
    icon: InformationCircleIcon,
    nav: "/",
  },
];

export default function NavList() {
  const { token } = useContext(AuthContext);

  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />
      {navListItems.map(({ label, icon, nav }, key) => (
        <Typography
          key={label}
          as="a"
          href={label === "Raise Capital" && !token ? "/login" : nav}
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            <span className="text-gray-900"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}
