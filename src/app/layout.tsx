import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";
import { geistMono, geistSans } from "./fonts";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "YnadimeShop",
    template: "%s | YnadimeShop",
  },
  description:
    "Shop electronics, fashion, gaming accessories, and everyday essentials at YnadimeShop.",
  applicationName: "YnadimeShop",
  icons: {
    icon: [
      {
        url: "/ynadime_icon.png",
        sizes: "1254x1254",
        type: "image/png",
      },
    ],
    shortcut: "/ynadime_icon.png",
    apple: "/ynadime_icon.png",
  },
  openGraph: {
    title: "YnadimeShop",
    description:
      "Shop electronics, fashion, gaming accessories, and everyday essentials at YnadimeShop.",
    siteName: "YnadimeShop",
    type: "website",
    images: [
      {
        url: "/full_logo.png",
        width: 2172,
        height: 724,
        alt: "YnadimeShop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YnadimeShop",
    description:
      "Shop electronics, fashion, gaming accessories, and everyday essentials at YnadimeShop.",
    images: ["/full_logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
