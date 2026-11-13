import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const playfair = localFont({
  src: "../../public/fonts/PlayfairDisplay.woff2",
  variable: "--font-playfair",
  display: "swap",
});

const manrope = localFont({
  src: "../../public/fonts/Manrope.woff2",
  variable: "--font-manrope",
  display: "swap",
});

const caveat = localFont({
  src: "../../public/fonts/Caveat.woff2",
  variable: "--font-caveat",
  display: "swap",
});

const dmSerif = localFont({
  src: "../../public/fonts/DMSerifDisplay.woff2",
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cafe Face | Good Coffee. Better Moments | Selly Oak, Birmingham",
  description:
    "Independent café on Bristol Road, Selly Oak, Birmingham. Handcrafted specialty coffee, artisan brunch, Mediterranean flatbread boxes, wraps, and sweet moments.",
  keywords: [
    "Cafe Face",
    "Selly Oak cafe",
    "Birmingham coffee shop",
    "Bristol Road cafe",
    "specialty coffee Birmingham",
    "flatbread box",
    "brunch Selly Oak",
    "University of Birmingham cafe",
  ],
  authors: [{ name: "Cafe Face" }],
  creator: "Cafe Face",
  publisher: "Cafe Face",
  metadataBase: new URL("https://cafeface.co.uk"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://cafeface.co.uk",
    title: "Cafe Face | Good Coffee. Better Moments | Selly Oak, Birmingham",
    description:
      "A little coffee, a little comfort, a lot of good moments. Handcrafted espresso, artisan brunch & Mediterranean flatbreads in Selly Oak, Birmingham.",
    siteName: "Cafe Face",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Cafe Face — Selly Oak, Birmingham",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cafe Face | Good Coffee. Better Moments",
    description:
      "Handcrafted specialty coffee and fresh Mediterranean eats in Selly Oak, Birmingham.",
    images: ["/images/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#F3EAE0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: "Cafe Face",
    image: "https://cafeface.co.uk/images/hero-bg.jpg",
    "@id": "https://cafeface.co.uk",
    url: "https://cafeface.co.uk",
    telephone: "+44 121 415 4651",
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      streetAddress: "519 Bristol Road",
      addressLocality: "Selly Oak",
      addressRegion: "Birmingham",
      postalCode: "B29 6AU",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.4432,
      longitude: -1.9366,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "16:00",
      },
    ],
    sameAs: [
      "https://www.instagram.com/cafeface_sellyoak/",
      "https://www.ubereats.com",
    ],
    servesCuisine: [
      "Coffee",
      "Breakfast",
      "Brunch",
      "Mediterranean",
      "Wraps",
      "Flatbreads",
    ],
  };

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} ${caveat.variable} ${dmSerif.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-cream text-espresso selection:bg-terracotta selection:text-vanilla font-sans antialiased min-h-screen relative flex flex-col">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
