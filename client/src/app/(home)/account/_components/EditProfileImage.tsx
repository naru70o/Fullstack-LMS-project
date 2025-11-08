"use client";
import { Camera } from "lucide-react";
import { useState } from "react";
import { ImageCropDialog } from "./ImageCropDialog";

export default function ProfileEditor() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImage(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    console.log("Upload clicked");
    setDialogOpen(false);
  };

  console.log("Selected image:", image);
  return (
    <>
      <label className="absolute right-0 bottom-0 w-6 h-6 bg-popover/50 rounded-full flex items-center justify-center cursor-pointer">
        <Camera
          size={14}
          className="text-popover-foreground transition-all ease-in-out hover:text-primary"
          onClick={() => setDialogOpen(true)}
        />
        <input
          name="profile"
          type="file"
          className="hidden"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSelectFile(e)}
        />
      </label>
      <ImageCropDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onUpload={handleUpload}
        imageUrl={image}
      />
    </>
  );
}
