import { AlertCircle } from "lucide-react";
import React from "react";

export default function ErrorMessage({
  errorMessage,
}: {
  errorMessage: string;
}) {
  return (
    <div className="mx-6 mb-4 p-3 bg-muted border-amber-200 rounded-lg flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <p className="text-amber-800 text-sm">{errorMessage}</p>
    </div>
  );
}
