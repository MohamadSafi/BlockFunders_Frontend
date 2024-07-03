"use client";
import { ThemeProvider } from "@material-tailwind/react";

const ClientThemeProvider = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default ClientThemeProvider;
