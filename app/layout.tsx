import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Google Developer Group on Campus | McMaster University",
  description:
    "Google Developer Group on Campus at McMaster University bridges the gap between theory and practice through solving real-world problems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/images/icon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/icon-192.png"/>
        <link rel="icon" type="image/png" sizes="512x512" href="/images/icon-512.png"/>
      </Head>
      <body>{children}</body>
    </html>
  );
}
