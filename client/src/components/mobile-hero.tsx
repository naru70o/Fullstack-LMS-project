import React from "react";

import Pattern from "@/components/../public/assets/mobile-hero-decoration.svg";

export default function MobileHero() {
  return (
    <section className="mt-10 container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="md:hidden bg-primary min-h-[136px] min-w-[343px] rounded-xl relative overflow-hidden">
        <Pattern className="absolute right-0 bottom-0" />
        <div className="flex flex-col justify-start h-full gap-2 relative p-4 max-w-[80%]">
          <h1 className="text-white text-lg font-bold">
            Thanksgiving is coming!
          </h1>
          <p className="text-white text-sm">
            Get ready for the holiday season with our special courses and
            resources.
          </p>
        </div>
      </div>
    </section>
  );
}
