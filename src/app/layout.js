import { Inter } from "next/font/google";
import "./globals.css";
import ClientThemeProvider from "../providers/ThemeProvider";
import { AppwriteProvider } from "@/providers/appwriteContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BlockFunders",
  description: "Donate With BlockFunders",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppwriteProvider>
          <ClientThemeProvider>{children}</ClientThemeProvider>
        </AppwriteProvider>
      </body>
    </html>
  );
}
