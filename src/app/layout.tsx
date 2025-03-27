//import type { Metadata } from "next";
import { Urbanist, Noto_Sans, Noto_Sans_Georgian, Philosopher, Poppins, Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/redux_provider";
import Footer from "@/components/navigation/footer";
import ExportNav from "@/components/navigation/export_nav";
import fetchLocation from "@/utils/fetch_location";



export const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});


export const noto_sans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto_sans",
  display: "swap",
});

export const georgian = Noto_Sans_Georgian({
  subsets: ["latin"],
  variable: "--font-Georgian",
  display: "swap",
});

export const philsopher = Philosopher({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-Philosopher",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-Inter",
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-Poppins",
  display: "swap",
});

export const viewport = {
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content",
  themeColor: "#ffffff"
};


export const metadata = {
  title: "Melch.Store - Buy Premium Products Online",
  description:
    "Shop high-quality fashion, electronics, and home essentials at unbeatable prices. Fast shipping & secure checkout.",
  metadataBase: new URL("https://www.melch.store"),
  alternates: {
    canonical: "https://www.melch.store",
  },
  openGraph: {
    type: "website",
    title: "Melch.Store - Buy Premium Products Online",
    description:
      "Shop high-quality fashion, electronics, and home essentials at unbeatable prices. Fast shipping & secure checkout.",
    url: "https://www.melch.store",
    siteName: "Melch.Store",
    images: [
      {
        url: "/melch_logo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@melchstore",
    creator: "@melchstore",
    title: "Melch.Store - Buy Premium Products Online",
    description:
      "Shop high-quality fashion, electronics, and home essentials at unbeatable prices. Fast shipping & secure checkout.",
    images: ["/melch_logo.png"],
  },
  appleWebApp: {
    capable: true,
    title: "Melch.Store",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
    shortcut: "/logo.svg",
  },
  other: {
    keywords:
      "Melch.Store, online shopping, fashion, electronics, home essentials, best deals, fast shipping",
    robots: "index, follow",
    author: "Melch.Store Team",
    viewport: "width=device-width, initial-scale=1",
    referrer: "no-referrer-when-downgrade",
  },
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await fetchLocation()

  return (
    <html lang="en">
      <body className={`${urbanist.variable} antialiased font-urbanist`}>
        <ReduxProvider>
          <ExportNav currency={'Naira'} flag={data.flag.img} language='English' userLocation={data.country} />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
