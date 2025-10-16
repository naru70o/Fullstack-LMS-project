import React from "react";
import { addinstructor } from "../action";

export default function Form({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col items-center gap-4 mt-8 lg:mt-0">
      <form
        action={addinstructor}
        className="flex flex-col gap-4 w-[300px] md:w-xl"
      >
        {children}
      </form>
    </div>
  );
}

/*
      <form className="flex flex-col gap-4 w-[300px] md:w-xl">
        <input
          type="text"
          placeholder="full name"
          className="bg-[var(--input-bg-color)] w-full max-w-xl p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-[var(--input-text-color)] font-poppins text-[16px] font-normal leading-[24px]"
        />
        <input
          type="text"
          placeholder="display name"
          className="bg-[var(--input-bg-color)] w-full max-w-xl p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-[var(--input-text-color)] font-poppins text-[16px] font-normal leading-[24px]"
        />
        <input
          type="email"
          placeholder="john.doe@example.com"
          className="bg-[var(--input-bg-color)] w-full max-w-xl p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-[var(--input-text-color)] font-poppins text-[16px] font-normal leading-[24px]"
        />
        <SelectInput
          className="w-full max-w-full"
          selectItems={["somali", "english"]}
          selectLabel="language"
          selectPlaceholder="Select a language"
        />
        <Button
          size="lg"
          variant="primary"
          className="w-fit self-end bg-[var(--primary-color)] text-white hover:bg-primary/80 focus:ring-2 focus:ring-[var(--primary-color)] cursor-pointer mt-2"
        >
          Next step
        </Button>
      </form>
      */
