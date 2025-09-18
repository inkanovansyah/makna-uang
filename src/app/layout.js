import "./globals.css";
import { cx } from "@/src/utils";
import { Inter, Manrope } from "next/font/google";
import Header from "@/src/components/Header";
import Footer from "../components/Footer";
import siteMetadata from "../utils/siteMetaData";
import Script from "next/script";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-in",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mr",
});

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    images: [siteMetadata.socialBanner],
  },
  other: {
    "fb:app_id": process.env.NEXT_PUBLIC_FB_APP_ID || "2917496495115818",
  },
};

export default function RootLayout({ children }) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body
        className={cx(
          inter.className,
          manrope.className,
          "font-mr bg-light dark:bg-dark text-dark dark:text-light"
        )}
      >
        {/* ✅ Theme Switcher */}
        <Script id="theme-switcher" strategy="beforeInteractive">
          {`
            if (
              localStorage.getItem('theme') === 'dark' ||
              (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
            ) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          `}
        </Script>

        {/* ✅ Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', "${GA_MEASUREMENT_ID}", {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
