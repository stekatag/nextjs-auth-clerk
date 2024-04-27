// MainNav.tsx
import Link from "next/link";
import { Button } from "./ui/button";
import { SignedIn } from "@clerk/nextjs";

export default function MainNav() {
  return (
    <div className="mr-4 hidden gap-2 md:flex">
      <Button variant="link" className="text-md md:text-lg font-bold">
        <Link href="/">Home</Link>
      </Button>
      <SignedIn>
        <Button variant="link" className="text-md md:text-lg font-bold">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </SignedIn>
    </div>
  );
}
