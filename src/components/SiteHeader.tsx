"use client";

import Link from "next/link";
import {
  SignedOut,
  SignedIn,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import { Button } from "./ui/button";
import ModeToggle from "./ModeToggle";

export default function SiteHeader() {
  return (
    <nav>
      <ul className="m-6 md:m-10 text-md md:text-lg font-bold flex justify-between  item-center">
        <div className="flex md:gap-10 gap-5">
          <MainNav />
          <MobileNav />
        </div>
        <div className="flex md:gap-10 gap-5 align-center">
          <SignedOut>
            <ModeToggle />
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <ModeToggle />
            <Button variant="link" className="text-md md:text-lg font-bold">
              <Link href="/profile">
                <li>Profile</li>
              </Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </ul>
    </nav>
  );
}
