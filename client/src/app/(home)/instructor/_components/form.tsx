import React, { useActionState } from "react";
import { registerInstructorOne } from "../action";

export default function Form({ children }: { children: React.ReactNode }) {
  const [_state, formAction, pending] = useActionState(
    registerInstructorOne,
    null
  );

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
