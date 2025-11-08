"use client";
import { Button } from "@/components/components/ui/button";
import { Dialog, DialogContent } from "@/components/components/ui/dialog";
import { AlertCircle, Upload, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
} from "react-image-crop";

interface ImageCropDialogProps {
  open: boolean;
  setDialogOpen: (open: boolean) => void;
}
const ASPECT_RATIO = 1; // 1:1 for square crop
const MIN_DIMENSION = 150;

export function ImageCropDialog({ open, setDialogOpen }: ImageCropDialogProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 25,
    y: 25,
    height: 50,
    width: 50,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imageProperties, setImageProperties] = useState<{
    height: number;
    width: number;
  } | null>(null);

  const onHandleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height, naturalHeight, naturalWidth } = e.currentTarget;
    const croppedWidth = (MIN_DIMENSION / 100) * width;
    console.log(width, height, croppedWidth);
    if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
      setErrorMessage(
        `Image is too small. Minimum dimensions are ${MIN_DIMENSION}px by ${MIN_DIMENSION}px.`
      );
    } else if (
      naturalHeight > naturalWidth * 4 ||
      naturalWidth > naturalHeight * 4
    ) {
      setErrorMessage("Image aspect ratio is too extreme.");
    }
    const crop = makeAspectCrop(
      { unit: "%", width: croppedWidth },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setImageProperties((prev) => ({
      ...prev,
      height: height,
      width: width,
    }));
    setCrop(centeredCrop);
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImageUrl(reader.result as string)
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    console.log("Upload clicked");
    setDialogOpen(false);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        handleClose();
        setImageUrl(undefined);
      }}
    >
      <DialogContent className="w-full h-dvh md:max-w-2xl md:h-4/6  p-0 flex flex-col md:p-6">
        {/* Header */}
        <div className="p-6 pb-4 border-b md:border-b-0 md:p-0">
          <h2 className="text-2xl font-semibold">Crop Image</h2>
        </div>

        {/* Image Preview Area - takes up remaining space */}
        <div className="flex-1 flex items-center justify-center bg-muted m-6 mt-4 rounded-lg verflow-hidden">
          {imageUrl ? (
            <ReactCrop
              crop={crop}
              onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
              aspect={ASPECT_RATIO}
              keepSelection
              circularCrop
              minWidth={MIN_DIMENSION}
            >
              <Image
                src={imageUrl}
                onLoad={onHandleImageLoad}
                alt="To be cropped"
                width={imageProperties?.width || 500}
                height={imageProperties?.height || 500}
              />
            </ReactCrop>
          ) : (
            <p className="text-muted-foreground text-center px-4">
              No image selected
            </p>
          )}
        </div>
        <div className="mx-6 mb-4 p-3 bg-muted border-amber-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-amber-800 text-sm">{errorMessage}</p>
        </div>

        {/* Bottom Buttons - fixed at bottom */}
        <div className="flex items-center justify-center gap-3 p-6 border-t md:border-t-0 md:pt-4">
          <Button variant="outline" className="gap-2 before:relative">
            <span className="relative w-full flex items-center justify-center gap-2">
              <input
                name="profile"
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onSelectFile(e)
                }
              />
              {/* visible custom content */}
              <Upload className="w-4 h-4" />
              <span>Select image</span>
            </span>
            {/* select image */}
          </Button>
          <Button onClick={handleUpload} className="px-8">
            Upload
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
