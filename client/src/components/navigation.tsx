import React from "react";
import LogoNav from "@/components/../public/assets/logoNav.svg";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { SigninButton } from "./signinButton";
import { Input } from "./ui/input";
import { SignupButton } from "./singupButton";
import { UserSession } from "../util/interfaces";
import Image from "next/image";
import Cart from "@/components/../public/assets/Cart.svg";

export const Navigation = ({
  userSession,
}: {
  userSession: UserSession | null;
}) => {
  return (
    <section className="hidden md:flex w-full my-5 container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex w-full items-center justify-between ">
        <div className="flex items-center gap-12">
          <Link href="#">
            <LogoNav />
          </Link>
          <button className="flex items-center text-[var(--primary-color)] font-poppins text-[16px] not-italic font-normal leading-[21px] bg-transparent cursor-pointer hover:text-[var(--primary-color)]/70 transition-all">
            <span>Browse</span>
            <ChevronRight />
          </button>
        </div>
        {userSession ? (
          <div className="flex items-center gap-5">
            <Cart className="cursor-pointer" />
            <Image
              src={`/assets/${userSession.image}`}
              alt="User Image"
              width={36}
              height={36}
              className="rounded-full"
            />
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <SigninButton />
            <SignupButton />
          </div>
        )}
      </div>
    </section>
  );
};

export const NavigationFixed = () => {
  return (
    <section className="fixed top-0 left-0 right-0 z-50 bg-popover shadow-[var(--shadow-search-bar)] py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/">
            <LogoNav />
          </Link>
          <button className="flex items-center text-[var(--primary-color)] font-poppins text-[16px] not-italic font-normal leading-[21px] bg-transparent cursor-pointer hover:text-[var(--primary-color)]/70 transition-all">
            <span>Browse</span>
            <ChevronRight />
          </button>
        </div>
        {/* searchBar */}
        <div className="flex items-center gap-5 relative">
          <Input
            type="text"
            placeholder="Search keywords"
            className="py-3 px-12 rounded-[8px] text-start bg-popover/90 text-popover-foreground/90 font-poppins text-[12px] font-normal leading-[21px] w-[500px] h-[42px] shadow-none border-1 border-[var(--primary-color)] placeholder:text-sm placeholder:text-popover-foreground/30 "
          />
          <Search className="text-[var(--primary-color)] absolute left-0 top-1/2 transform -translate-y-1/2 ml-2" />
        </div>
        {/* Auth-Buttons */}
        <div className="flex items-center gap-5">
          <SigninButton />
          <SignupButton />
        </div>
      </div>
    </section>
  );
};
