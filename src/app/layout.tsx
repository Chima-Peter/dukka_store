import { Urbanist } from "next/font/google";
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#0D523F",
};

export const metadata = {
  title: "Dukka.Store - Buy Premium Products Online",
  description:
    "Shop high-quality fashion, electronics, and home essentials at unbeatable prices. Fast shipping & secure checkout.",
  metadataBase: new URL("https://www.dukka.store"),
  alternates: {
    canonical: "https://www.dukka.store",
  },
  openGraph: {
    type: "website",
    title: "Dukka.Store - Buy Premium Products Online",
    description:
      "Shop high-quality fashion, electronics, and home essentials at unbeatable prices. Fast shipping & secure checkout.",
    url: "https://www.dukka.store",
    siteName: "Dukka.Store",
    images: [
      {
        url: "/dukka_logo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@dukkastore",
    creator: "@dukkastore",
    title: "Dukka.Store - Buy Premium Products Online",
    description:
      "Shop high-quality fashion, electronics, and home essentials at unbeatable prices. Fast shipping & secure checkout.",
    images: ["/dukka_logo.png"],
  },
  appleWebApp: {
    capable: true,
    title: "Dukka",
    statusBarStyle: "black-translucent" as const,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/logo.svg",
  },
  other: {
    keywords:
      "Dukka.Store, online shopping, fashion, electronics, home essentials, best deals, fast shipping",
    robots: "index, follow",
    author: "Dukka.Store Team",
    referrer: "no-referrer-when-downgrade",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await fetchLocation();
  const geoFlag =
    data?.flag?.img ||
    data?.country_flag ||
    (data?.country_code
      ? `https://flagcdn.com/w40/${String(data.country_code).toLowerCase()}.png`
      : "");
  const geoLocation = data?.country || data?.country_name || "Your market";

  return (
    <html lang="en">
      <body className={`${urbanist.variable} antialiased font-urbanist bg-dukka-canvas text-dukka-ink`}>
        <ReduxProvider>
          <ExportNav
            currency=""
            flag={geoFlag}
            language="English"
            userLocation={geoLocation}
          />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
