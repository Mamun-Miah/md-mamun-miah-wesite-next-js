import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './components/Header';
import Footer from "./components/Footer";
import Aosanimation from "./components/Aosanimation";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mamun Miah",
  description: "I'm Mamun Miah, with over 7 years of experience helping businesses grow online through effective SEO and stunning websites.",
  icons: {
    icon: '/favicon.svg',  
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={ `${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <Aosanimation/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
