import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import CustomCursor from "@/components/CustomCursor";
import AIAssistant from "@/components/AIAssistant";

export const viewport: Viewport = {
  themeColor: "#080d1e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mc-dex.vercel.app"),
  title: {
    default: "MC-DEX - O'zbekiston №1 Minecraft Ensiklopediyasi & 3D Crafting",
    template: "%s | MC-DEX",
  },
  description:
    "MC-DEX (mc-dex.vercel.app) - O'zbekistondagi eng to'liq 24/7 Minecraft ensiklopediyasi: 1,300+ buyumlar, 3x3 ish stoli retseptlari, Ender Dragonni yutish masterklassi, Y: -58 olmos qidiruvi, 3D modellar va 24/7 AI yordamchi.",
  keywords: [
    "MC-DEX",
    "mc dex",
    "mc-dex.vercel.app",
    "Minecraft o'zbekcha",
    "Minecraft wiki uz",
    "Minecraft crafting retseptlari uzbek",
    "Minecraft yutish ketma-ketligi",
    "Minecraft server uzbekistan",
    "Minecraft o'zbek server",
    "Minecraft 1.21 o'zbekcha",
    "Minecraft Bedrock o'zbekcha",
    "Minecraft PE telefon o'zbekcha",
    "Minecraft olmos qazish",
    "Minecraft AI yordamchi",
  ],
  authors: [{ name: "MC-DEX Team", url: "https://mc-dex.vercel.app" }],
  creator: "MC-DEX",
  publisher: "MC-DEX",
  applicationName: "MC-DEX",
  category: "Gaming & Encyclopedia",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: {
    canonical: "https://mc-dex.vercel.app",
  },
  openGraph: {
    title: "MC-DEX - O'zbekiston №1 Minecraft Ensiklopediyasi",
    description:
      "1,300+ buyumlar, 3x3 crafting retseptlari, 3D orbital inspeksiya, Ender Dragonni yutish masterklassi va 24/7 AI yordamchi.",
    url: "https://mc-dex.vercel.app",
    siteName: "MC-DEX",
    locale: "uz_UZ",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "MC-DEX - Minecraft Ensiklopediyasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MC-DEX - O'zbekiston №1 Minecraft Ensiklopediyasi",
    description:
      "1,300+ buyumlar, 3x3 crafting retseptlari, 3D modellar va 24/7 AI yordamchi.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Google Search Schema.org JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://mc-dex.vercel.app/#website",
        url: "https://mc-dex.vercel.app",
        name: "MC-DEX",
        description: "O'zbekiston №1 Minecraft Ensiklopediyasi va 3D Crafting Baza",
        inLanguage: "uz",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://mc-dex.vercel.app/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://mc-dex.vercel.app/#organization",
        name: "MC-DEX",
        url: "https://mc-dex.vercel.app",
        logo: "https://mc-dex.vercel.app/icon.png",
      },
    ],
  };

  return (
    <html lang="uz">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-mc-dark min-h-screen antialiased font-['Inter','Outfit',sans-serif]">
        <Providers>
          <CustomCursor />
          {children}
          {/* ── 24/7 Floating AI Assistant in Corner (Matching Screenshot) ── */}
          <AIAssistant />
        </Providers>
      </body>
    </html>
  );
}
