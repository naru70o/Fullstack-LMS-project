"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TermsButtons() {
  const router = useRouter();
  const [showagreeMessage, setShowagreeMessage] = useState(false);

  const handleAgree = () => {
    setShowagreeMessage(true);
  };

  const handleDisagree = () => {
    router.push("/courses");
  };
  return (
    <div className="border-t border-white/10 p-6 bg-[#0f0f0f]">
      {showagreeMessage ? (
        <div className="text-center space-y-4">
          <p className="text-white/80">are you sure you want to agree?</p>
          <Link href="/instructor/step-one">
            <Button
              onClick={() => setShowagreeMessage(false)}
              variant="outline"
              size="lg"
              className="cursor-pointer bg-transparent border-primary/20 text-white hover:bg-primary/10"
            >
              yes, i agree
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={handleDisagree}
            variant="outline"
            size="lg"
            className="bg-transparent border-white/20 text-white hover:bg-white/10 min-w-[140px]"
          >
            Disagree
          </Button>
          <Button
            onClick={handleAgree}
            size="lg"
            className="bg-primary text-white cursor-pointer transition-all ease-in-out min-w-[140px]"
          >
            Agree & Continue
          </Button>
        </div>
      )}
    </div>
  );
}
