import Link from "next/link";
import { SignedOut, SignedIn, UserButton, SignInButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex justify-between m-10 item-center">
        <div>
          <Link href="/">
            <li>Home</li>
          </Link>
        </div>
        <div className="flex gap-10">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </ul>
    </nav>
  );
}
