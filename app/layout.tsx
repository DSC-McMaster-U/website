import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
import Footer from "./components/footer";
import Header from "./components/header";

export const metadata: Metadata = {
  title: "GDSC McMaster U",
  description: "Google Developer Student Club at McMaster University bridges the gap between theory and practice through solving real-world problems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
