import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dukka.Store",
    short_name: "Dukka",
    description:
      "Shop high-quality products across markets with live pricing and secure Paystack checkout.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#0D523F",
    theme_color: "#0D523F",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
