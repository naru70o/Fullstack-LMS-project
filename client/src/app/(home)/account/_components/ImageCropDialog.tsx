"use client";
import { Button } from "@/components/components/ui/button";
import { Dialog, DialogContent } from "@/components/components/ui/dialog";
import { X } from "lucide-react";

interface ImageCropDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: () => void;
  imageUrl?: string;
}

export function ImageCropDialog({
  open,
  onOpenChange,
  onUpload,
  imageUrl,
}: ImageCropDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full h-dvh md:max-w-2xl md:h-4/6  p-0 flex flex-col md:p-6">
        {/* Header */}
        <div className="p-6 pb-4 border-b md:border-b-0 md:p-0">
          <h2 className="text-2xl font-semibold">Crop Image</h2>
        </div>

        {/* Image Preview Area - takes up remaining space */}
        <div className="flex-1 flex items-center justify-center bg-muted m-6 mt-4 rounded-lg overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="Image to crop"
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <p className="text-muted-foreground text-center px-4">
              No image selected
            </p>
          )}
        </div>

        {/* Bottom Buttons - fixed at bottom */}
        <div className="flex items-center justify-center gap-3 p-6 border-t md:border-t-0 md:pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button onClick={onUpload} className="px-8">
            Upload
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
