"use client";
import React from "react";
import { Typography, MenuItem } from "@material-tailwind/react";
import {
  BanknotesIcon,
  MagnifyingGlassIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import NavListMenu from "./NavListMenu";

const navListItems = [
  {
    label: "Raise Capital",
    icon: BanknotesIcon,
  },
  {
    label: "Browse campaigns",
    icon: MagnifyingGlassIcon,
  },
  {
    label: "About us",
    icon: InformationCircleIcon,
  },
];

export default function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />
      {navListItems.map(({ label, icon }, key) => (
        <Typography
          key={label}
          as="a"
          href="#"
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
