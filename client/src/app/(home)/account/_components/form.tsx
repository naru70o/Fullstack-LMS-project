"use client";
import React, { useEffect, useState } from "react";
import { SelectInput } from "../../courses/_components/heroSearchBar";
import { Button } from "@/components/components/ui/button";
import { UserSession } from "@/components/util/interfaces";
import { email } from "zod";

export default function Form({ userSession }: { userSession: UserSession }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    displayName: "",
  });
  const { email, image, name } = userSession;
  useEffect(() => {
    setUser((prev) => ({ ...prev, email, image, name }));
  }, [email, image, name]);

  const displayName = user.name.split(" ")[0];
  console.log(displayName);
  return (
    <form className="flex flex-col gap-4 w-[300px] md:w-xl">
      <input
        type="text"
        placeholder="full name"
        value={user.name}
        className="bg-[var(--input-bg-color)] w-full max-w-xl p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-[var(--input-text-color)] font-poppins text-[16px] font-normal leading-[24px]"
      />
      <input
        type="text"
        placeholder="display name"
        value={displayName}
        className="bg-[var(--input-bg-color)] w-full max-w-xl p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-[var(--input-text-color)] font-poppins text-[16px] font-normal leading-[24px]"
      />
      <input
        type="email"
        value={user.email}
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
        className="w-full bg-[var(--primary-color)] text-white hover:bg-primary/80 focus:ring-2 focus:ring-[var(--primary-color)] cursor-pointer mt-2"
      >
        Save Changes
      </Button>
    </form>
  );
}
