import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import React from "react";

export default function SelectImageBtn({
  handleSelectFile,
}: {
  handleSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Button variant="outline" className="gap-2 before:relative">
      <span className="relative w-full flex items-center justify-center gap-2">
        <input
          name="profile"
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSelectFile(e)
          }
        />
        {/* visible custom content */}
        <Upload className="w-4 h-4" />
        <span>Select image</span>
      </span>
      {/* select image */}
    </Button>
  );
}
