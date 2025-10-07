import React from "react";
import { Navigation } from "./navigation";
import Image from "next/image";
import { HeroSearchBar } from "../app/courses/_components/heroSearchBar";
import { UserSession } from "../util/interfaces";
import MobileNavigation from "./mobileNavigation";
export const Hero = ({ userSession }: { userSession: UserSession | null }) => {
  return (
    <section className="h-[85vh] w-screen flex flex-col items-center relative bg-[#1B1B1B]/70">
      {/* navigation */}
      <Navigation userSession={userSession} />
      <MobileNavigation />
      <Image
        src={"/assets/HeroIMage.png"}
        alt="Hero Image"
        fill
        className="absolute bottom-0 left-0 w-full h-full object-cover -z-10"
      />
      {/* Container for the main content */}
      <div className="container mx-auto h-full grid content-center mb-56">
        {/* Main heading */}
        <div className="flex flex-col justify-center gap-2">
          <h1 className="text-white text-center font-poppins text-5xl not-italic font-bold leading-[62px]">
            Learn something new everyday.
          </h1>
          <p className="text-white text-center font-poppins text-2xl not-italic font-normal leading-[30px] max-w-2xl mx-auto">
            Join our community of learners and start your journey today.
          </p>
        </div>
      </div>
      <HeroSearchBar />
    </section>
  );
};
