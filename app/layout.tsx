import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Google Developer Group on Campus | McMaster University",
  description:
    "Google Developer Group on Campus at McMaster University bridges the gap between theory and practice through solving real-world problems.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icon.png", // Apple touch icon
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
