"use client";
import { Button } from "@/components/components/ui/button";
import { UserSession } from "@/components/util/interfaces";
import { useActionState, useEffect, useState } from "react";
import { SelectInput } from "../../courses/_components/heroSearchBar";
import { updateProfile } from "../action";

interface FormProps {
  name: string;
  email: string;
  displayName: string;
}

export default function Form({
  userSession,
}: {
  userSession: UserSession | null;
}) {
  const [user, setUser] = useState<FormProps>({
    name: "",
    email: "",
    displayName: "",
  });
  const [state, formAction, pending] = useActionState(updateProfile, null);
  const { email, image, name } = userSession ?? {
    name: "",
    email: "",
    image: "",
  };

  useEffect(() => {
    setUser((prev) => ({ ...prev, email, image, name }));
  }, [email, image, name]);
  console.log(state);
  const displayName = name.split(" ")[0];
  return (
    <form action={formAction} className="flex flex-col gap-4 w-[300px] md:w-xl">
      <input
        type="text"
        placeholder="name"
        value={user.name}
        name="name"
        onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
        className="bg-[var(--input-bg-color)] w-full max-w-xl p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-[var(--input-text-color)] font-poppins text-[16px] font-normal leading-[24px]"
      />
      <input
        type="text"
        readOnly={true}
        disabled={true}
        placeholder="display name"
        value={displayName}
        className="bg-[var(--input-bg-color)] w-full max-w-xl p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-[var(--input-text-color)] font-poppins text-[16px] font-normal leading-[24px] disabled:bg-[var(--input-bg-color)]/70 disabled:text-[var(--input-text-color)]/70"
      />
      <input
        type="email"
        readOnly={true}
        disabled
        value={user.email}
        placeholder="john.doe@example.com"
        className="bg-[var(--input-bg-color)] w-full max-w-xl p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-[var(--input-text-color)] font-poppins text-[16px] font-normal leading-[24px] disabled:bg-[var(--input-bg-color)]/70 disabled:text-[var(--input-text-color)]/70"
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
        type="submit"
        disabled={pending}
      >
        Save Changes
      </Button>
    </form>
  );
}
