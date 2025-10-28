"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Form({
  children,
  action,
  state,
}: {
  children: React.ReactNode;
  state:
    | {
        success: boolean;
        message: string;
        route?: string | undefined;
      }
    | Record<string, string>
    | null;
  action: (payload: FormData) => void;
}) {
  const navigator = useRouter();
  useEffect(() => {
    if (state?.route) {
      navigator.push(state.route);
    }
  }, [state?.route, navigator]);

  return (
    <div className="w-full flex flex-col items-center gap-4 mt-8 lg:mt-0">
      <form action={action} className="flex flex-col gap-4 w-[300px] md:w-xl">
        {children}
      </form>
    </div>
  );
}
