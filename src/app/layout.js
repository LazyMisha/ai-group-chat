import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Group Chat",
  description: "Multiple people can chat with AI in real-time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="google-site-verification" content="sFjldDMNudWEpl0w-EJ74ANMaYpB17xrk5wb10lU4Vo" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
