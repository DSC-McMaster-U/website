import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Google Developer Group on Campus | McMaster University",
  description: "Google Developer Group on Campus at McMaster University bridges the gap between theory and practice through solving real-world problems.",
  icons: [
    {
      url: "/icon.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
