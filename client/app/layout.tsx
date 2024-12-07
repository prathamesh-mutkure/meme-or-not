"use client";

import { Providers } from "./providers";
import localFont from "next/font/local";
import "./globals.css";
import { useEffect, useState } from "react";
import Image from "next/image";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const MOBILE_WIDTH_THRESHOLD = 430;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = window.navigator.userAgent;
      const hasMobileUserAgent = Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      );
      
      const isMobileWidth = window.innerWidth < MOBILE_WIDTH_THRESHOLD;
      setIsMobile(hasMobileUserAgent && isMobileWidth);
    };

    checkMobile();

    // Add resize listener for tablet/desktop mode changes
    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Common classes for body
  const bodyClasses = `${geistSans.variable} ${geistMono.variable} antialiased`;

  // Show nothing during initial check
  if (isMobile === null) {
    return null;
  }

  // Desktop view with QR code
  if (!isMobile) {
    return (
      <html lang="en">
        <body className={bodyClasses}>
          <main className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="max-w-md text-center space-y-4">
              <h1 className="text-2xl font-bold text-foreground">
                Mobile Only App
              </h1>
              <p className="text-muted-foreground">
                This app is designed for mobile devices only. Please open it on
                your phone or tablet with a screen width smaller than 430px.
              </p>
              <div className="relative w-48 h-48 mx-auto border border-border rounded-lg overflow-hidden">
                <Image
                  src="/Website.png"
                  alt="QR Code"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </main>
        </body>
      </html>
    );
  }

  // Mobile view
  return (
    <html lang="en">
      <body className={bodyClasses}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}