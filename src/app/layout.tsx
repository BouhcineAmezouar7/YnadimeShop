import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";
import { geistMono, geistSans } from "./fonts";

export const metadata: Metadata = {
  title: "YnadimeShop",
  description:
    "Shop electronics, fashion, gaming accessories, and everyday essentials at YnadimeShop.",
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
