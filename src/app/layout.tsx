import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import { ThemeProvider } from "@/components/theme-provider";
import LoadingSpinner from "@/components/LoadingSpinner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Demo Auth App | Clerk",
  description: "Next.js demo app with Clerk authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>
              <ClerkLoading>
                <div className="flex items-center justify-center h-screen">
                  <LoadingSpinner />
                </div>
              </ClerkLoading>
              <ClerkLoaded>
                <SiteHeader />
                <section className="flex flex-col items-center mt-16">
                  {children}
                </section>
              </ClerkLoaded>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
