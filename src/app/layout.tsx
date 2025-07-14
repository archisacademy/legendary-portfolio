import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DefaultSeo } from "next-seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Legendary Portfolio",
  description: "A modern portfolio built with Next.js, Tailwind CSS, and Three.js",
  metadataBase: new URL(process.env.SITE_URL || 'https://legendary-portfolio.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Legendary Portfolio",
    description: "A modern portfolio built with Next.js, Tailwind CSS, and Three.js",
    url: process.env.SITE_URL || 'https://legendary-portfolio.vercel.app',
    siteName: "Legendary Portfolio",
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Legendary Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Legendary Portfolio",
    description: "A modern portfolio built with Next.js, Tailwind CSS, and Three.js",
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Your Name",
              "jobTitle": "Full Stack Developer",
              "url": process.env.SITE_URL || "https://legendary-portfolio.vercel.app",
              "sameAs": [
                "https://github.com/username",
                "https://linkedin.com/in/username",
                "https://twitter.com/username"
              ],
              "description": "Full Stack Developer specializing in React, Next.js, and modern web technologies",
              "image": `${process.env.SITE_URL || 'https://legendary-portfolio.vercel.app'}/profile.svg`,
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DefaultSeo
          titleTemplate="%s | Legendary Portfolio"
          defaultTitle="Legendary Portfolio"
          description="A modern portfolio built with Next.js, Tailwind CSS, and Three.js"
          openGraph={{
            type: 'website',
            locale: 'en_US',
            url: process.env.SITE_URL || 'https://legendary-portfolio.vercel.app',
            siteName: 'Legendary Portfolio',
            images: [
              {
                url: '/og-image.svg',
                width: 1200,
                height: 630,
                alt: 'Legendary Portfolio',
              },
            ],
          }}
          twitter={{
            handle: '@username',
            site: '@username',
            cardType: 'summary_large_image',
          }}
          additionalMetaTags={[
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            },
            {
              name: 'theme-color',
              content: '#1a103d',
            },
          ]}
        />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
