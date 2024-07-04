"use client";
import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Bars2Icon } from "@heroicons/react/24/solid";
import ProfileMenu from "./ProfileMenu";
import NavList from "./NavList";
import { useAppwrite } from "../../providers/appwriteContext";
import Link from "next/link";

export function ResponsiveNavbar() {
  const { account, setUser } = useAppwrite();
  const user = account.get();
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  // React.useEffect(() => {
  //   const fetchUser = async () => {
  //     if (!user) {
  //       setIsLoggedIn(false);
  //     } else {
  //       setIsLoggedIn(true);
  //     }
  //   };
  //   fetchUser();
  // });

  return (
    <Navbar className="mx-auto max-w-screen p-2 lg:rounded-full lg:pl-6 shadow-2xl bg-[#f6f0eb] border-[#f6f0eb]">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          <p className="text-2xl font-bold font-sans">
            <span className="text-[#7BA7D7]">B</span>lock
            <span className="text-[#7BA7D7]">F</span>unders
          </p>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        {isLoggedIn ? (
          <ProfileMenu setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <div>
            <Button
              size="sm"
              variant="text"
              // onClick={() => setIsLoggedIn(true)}
            >
              <Link href="/login" className="font-medium font-sans">
                Login
              </Link>
            </Button>
            <Button
              size="sm"
              variant="text"
              // onClick={() => setIsLoggedIn(true)}
            >
              <Link href="/signup" className="font-medium font-sans">
                Get Started
              </Link>
            </Button>
          </div>
        )}
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
}
