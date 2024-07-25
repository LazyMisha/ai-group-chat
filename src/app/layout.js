import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Group Chat",
  description: "Multiple people can chat with AI in real-time.",
  verification: {
    google: "sFjldDMNudWEpl0w-EJ74ANMaYpB17xrk5wb10lU4Vo",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}
