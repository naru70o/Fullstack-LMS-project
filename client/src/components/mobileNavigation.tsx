"use client";

import { Search, Menu, Heart, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import NavLogo from "@/components/../public/assets/logoNav.svg";
import Cart from "@/components/../public/assets/Cart.svg";
import Image from "next/image";
export default function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // handle menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const primaryColor = "#FB7A79";
  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-popover shadow-[var(--shadow-search-bar)] py-4 px-4">
        <div className="container mx-auto flex items-center justify-between w-full">
          <div className="flex items-center justify-between w-full">
            <div className="p-2 hover:bg-popover-foreground/7 rounded-md">
              <Menu size={20} color="#FB7A79" onClick={toggleMenu} />
              {/* links */}
            </div>
            {/* searchBar */}
            <Link href="/" className="">
              <NavLogo />
            </Link>
            {/* Auth-Buttons */}
            <div className="flex items-center gap-2">
              <div className="p-2 hover:bg-popover-foreground/7 rounded-md">
                <Search size={20} color="#FB7A79" />
              </div>
              <div className="p-2 hover:bg-popover-foreground/7 rounded-md">
                <Cart />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* the blured background */}
      {/* Overlay */}
      <div
        className={`bg-popover/5 backdrop-blur-xl md:hidden z-[90] flex h-screen w-full right-0 top-0 fixed ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition-opacity duration-500`}
      >
        {/* Close button */}
        <div className="p-2 bg-[var(--surface-light)] rounded-full fixed top-6 right-4">
          <X size={20} color="#FB7A79" onClick={toggleMenu} />
        </div>
        {/* Slide-in navigation panel */}
        <div
          className={`bg-popover backdrop-blur-xl md:hidden z-[95] flex h-screen w-[70%] left-0 top-0 fixed overflow-clip
        transition-transform duration-500
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex flex-col justify-start items-start gap-4 w-full">
            {/* user profile */}
            <div className="bg-popover-foreground/10 flex flex-row items-center justify-start gap-4 px-4 py-4 w-full">
              <div className="relative inline-flex w-[60px] h-[60px] rounded-full overflow-hidden flex-none">
                <Image
                  src="/assets/default.png"
                  alt="User Profile"
                  fill
                  className="absolute object-fill"
                />
              </div>
              <div className="flex flex-col justify-start w-fit">
                <h2 className="text-xl font-bold break-all">Hi, John Doe</h2>
                <p className="text-popover-foreground/60 text-sm break-all">
                  welcome back
                </p>
              </div>
            </div>
            {/* navigation links */}
            <div className="flex flex-col gap-4 text-lg text-popover-foreground px-4">
              <Link
                href="/my-learning"
                className="hover:text-popover-foreground/60 flex gap-2 items-center transition-all duration-200"
              >
                <span>my-learning</span>
              </Link>
              <Link
                href="/about"
                className="hover:text-popover-foreground/60 transition-all duration-200"
              >
                Account
              </Link>
              <Link
                href="/services"
                className="hover:text-popover-foreground/60 transition-all duration-200"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="hover:text-popover-foreground/60 transition-all duration-200"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
