import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* This button will trigger open the mobile sheet menu */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <div className="flex flex-col items-start">
          <Button variant="link" onClick={() => setOpen(false)}>
            <Link href="/">Home</Link>
          </Button>
          <SignedIn>
            <Button variant="link" onClick={() => setOpen(false)}>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </SignedIn>
        </div>
      </SheetContent>
    </Sheet>
  );
}
