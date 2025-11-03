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
import { Avatar, AvatarFallback } from "./ui/avatar";
import Browse from "./browse";

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
          <Browse />
        </div>
        {userSession ? (
          <div className="flex items-center gap-5">
            <Link href="/my-learning">
              <button className="text-white hover:text-white/60 transition-all cursor-pointer">
                my learning
              </button>
            </Link>
            <Cart className="cursor-pointer" />
            <Link href="/account">
              <Image
                src={`/assets/${userSession.image}`}
                alt="User Image"
                width={36}
                height={36}
                className="rounded-full"
              />
            </Link>
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
  const userSession = true; // Replace with actual user session logic
  return (
    <section className="hidden lg:flex fixed top-0 left-0 right-0 z-50 bg-popover shadow-[var(--shadow-search-bar)] py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/">
            <LogoNav />
          </Link>
          <button className="items-center text-[var(--primary-color)] font-poppins text-[16px] not-italic font-normal leading-[21px] bg-transparent cursor-pointer hover:text-[var(--primary-color)]/70 transition-all hidden">
            <span>Browse</span>
            <ChevronRight />
          </button>
        </div>
        {/* searchBar */}
        <div className="hidden lg:flex items-center gap-5 relative">
          <Input
            type="text"
            placeholder="Search keywords"
            className="py-3 px-12 rounded-[8px] text-start bg-popover/90 text-popover-foreground/90 font-poppins text-[12px] font-normal leading-[21px] w-[500px] h-[42px] shadow-none border-1 border-[var(--primary-color)] placeholder:text-sm placeholder:text-popover-foreground/30 "
          />
          <Search className="text-[var(--primary-color)] absolute left-0 top-1/2 transform -translate-y-1/2 ml-2" />
        </div>
        {/* Auth-Buttons */}
        {userSession ? (
          <div className="flex items-center gap-5">
            <Link href="/my-learning">
              <button className="text-popover-foreground hover:text-popover-foreground/70 transition-all cursor-pointer">
                my learning
              </button>
            </Link>
            <div className="p-2 hover:bg-popover-foreground/7 rounded-md">
              <Cart className="cursor-pointer" />
            </div>
            <Avatar asChild className="w-9 h-9">
              <AvatarFallback>KN</AvatarFallback>
            </Avatar>
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
