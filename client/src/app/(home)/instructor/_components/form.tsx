"use client";
import React, { useEffect, useActionState } from "react";
import { registerInstructorOne } from "../action";
import { useRouter } from "next/navigation";

export default function Form({ children }: { children: React.ReactNode }) {
  const navigator = useRouter();
  const [state, formAction, pending] = useActionState(
    registerInstructorOne,
    null
  );

  console.log(state);
  useEffect(() => {
    if (state?.route) {
      navigator.push(state.route);
    }
  }, [state?.route, navigator]);

  return (
    <div className="w-full flex flex-col items-center gap-4 mt-8 lg:mt-0">
      <form
        action={formAction}
        className="flex flex-col gap-4 w-[300px] md:w-xl"
      >
        {children}
      </form>
    </div>
  );
}
