import { Inter } from "next/font/google";
import "./globals.css";
import { AppwriteProvider } from "@/providers/appwriteContext";
import { AuthProvider } from "@/providers/AuthContext";
import RainbowKitProviderWrapper from "../providers/RainbowKitProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BlockFunders",
  description: "Donate With BlockFunders",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RainbowKitProviderWrapper>
          <AppwriteProvider>
            <AuthProvider>{children}</AuthProvider>
          </AppwriteProvider>
        </RainbowKitProviderWrapper>
      </body>
    </html>
  );
}
