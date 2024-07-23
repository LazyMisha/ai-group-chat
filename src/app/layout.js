import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>AI Group Chat</title>
        <meta name="description" content='Multiple people can chat with AI in real-time.' />
        <meta name="google-site-verification" content="sFjldDMNudWEpl0w-EJ74ANMaYpB17xrk5wb10lU4Vo" />
      </Head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
