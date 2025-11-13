"use client";
import { Camera } from "lucide-react";
import { useState } from "react";
import { ImageCropDialog } from "./ImageCropDialog";

export default function ProfileEditor() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <label className="absolute right-0 bottom-0 w-6 h-6 bg-popover/50 rounded-full flex items-center justify-center cursor-pointer">
        <Camera
          size={14}
          className="text-popover-foreground transition-all ease-in-out hover:text-primary"
          onClick={() => setDialogOpen(true)}
        />
      </label>
      <ImageCropDialog open={dialogOpen} setDialogOpen={setDialogOpen} />
    </>
  );
}
