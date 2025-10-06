import { Search, Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import NavLogo from "@/components/../public/assets/logoNav.svg";
import Cart from "@/components/../public/assets/Cart.svg";
import Image from "next/image";
export default function MobileNavigation() {
  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-popover shadow-[var(--shadow-search-bar)] py-4 px-4">
        <div className="container mx-auto flex items-center justify-between w-full">
          <div className="flex items-center justify-between w-full">
            <div className="p-2 hover:bg-[var(--surface-light)] rounded-md">
              <Menu size={20} color="#FB7A79" />
              {/* links */}
            </div>
            {/* searchBar */}
            <Link href="/" className="">
              <NavLogo />
            </Link>
            {/* Auth-Buttons */}
            <div className="flex items-center gap-2">
              <div className="p-2 hover:bg-[var(--surface-light)] rounded-md">
                <Search size={20} color="#FB7A79" />
              </div>
              <div className="p-2 hover:bg-[var(--surface-light)] rounded-md">
                <Cart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
