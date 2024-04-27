import { Button } from "@/components/ui/button";
import { SignedOut, SignedIn } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  return (
    <section className="mx-auto max-w-2xl px-7 py-32 sm:py-48 lg:py-56">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Next.js Demo Auth App with Clerk
        </h1>
        <p className="mt-6 text-lg leading-8">
          This is a demo app to showcase how to use Clerk with Next.js. Clerk is
          a developer-first authentication and user management service.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button>
            <SignedOut>
              <Link href="/sign-in">Get Started</Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">Dashboard</Link>
            </SignedIn>
          </Button>
          <Button variant="outline">
            <Link
              href="https://github.com/stekatag/nextjs-auth-clerk"
              target="_blank"
            >
              Learn more &nbsp;
              <span aria-hidden="true">→</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
