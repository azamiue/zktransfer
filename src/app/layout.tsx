import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata } from "next";
import localFont from "next/font/local";
import "react-tooltip/dist/react-tooltip.css";
import "./globals.css";

const title = "ZKTransfer";
const description =
  "Effortlessly farm airdrops with AutoAir Telegram Bot. Utilizing AI-generated strategy for instant, 1-click auto-farming.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN || ""),
  title: title,
  description: description,
  keywords: ["ZKTransfer", "ZK"],
  twitter: {
    site: process.env.NEXT_PUBLIC_DOMAIN || "",
    description,
    title,
    images: process.env.NEXT_PUBLIC_SOCIAL_IMAGE,
  },
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_DOMAIN || "",
    title,
    description,
    siteName: title,
    images: [
      {
        url: process.env.NEXT_PUBLIC_SOCIAL_IMAGE || "",
      },
    ],
  },
};

const neue_Montreal = localFont({
  src: [
    {
      path: "../font/ppneuemontreal-thin.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../font/ppneuemontreal-book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/ppneuemontreal-medium.otf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../font/ppneuemontreal-bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-ppneuemontreal",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${neue_Montreal.variable} font-sans`}>{children}</body>
      <GoogleAnalytics gaId="G-5VWQTNE6BS" />
    </html>
  );
}
