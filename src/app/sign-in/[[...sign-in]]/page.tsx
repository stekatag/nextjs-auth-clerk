import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <SignIn path="/sign-in" />
      <p className="mt-2 text-sm ext-center hover:underline">
        <Link href="/forgot-password">Forgot your password?</Link>
      </p>
    </>
  );
}
