import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium E-commerce Store - Discover Quality Products",
  description:
    "Shop premium quality products including electronics, jewelry, clothing and more. Fast shipping, excellent customer service, and unbeatable prices.",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  authors: [{ name: "E-commerce Team" }],
  creator: "Premium E-commerce Store",
  publisher: "Premium E-commerce Store",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://your-domain.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Premium E-commerce Store - Discover Quality Products",
    description:
      "Shop premium quality products including electronics, jewelry, clothing and more.",
    url: "https://your-domain.com",
    siteName: "Premium E-commerce Store",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Premium E-commerce Store",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    creator: "@yourtwitterhandle",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
