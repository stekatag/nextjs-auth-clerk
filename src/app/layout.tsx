import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main className="mx-36 text-2xl">
            <ClerkLoading>
              <div className="flex items-center justify-center h-screen">
                <p className="text-2xl">Loading...</p>
              </div>
              <Navbar />
            </ClerkLoading>
            <ClerkLoaded>
              <Navbar />
              <section className="flex flex-col items-center mt-16">
                {children}
              </section>
            </ClerkLoaded>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
