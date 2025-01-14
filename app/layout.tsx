import type { Metadata } from "next";
import {Inter} from 'next/font/google'
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import {auth}  from "../auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <Navbar/>
          {children}
          <Footer/>
        </div>
      </body>
    </html>
    </SessionProvider>
  );
}
