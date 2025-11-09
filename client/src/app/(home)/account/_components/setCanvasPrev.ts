// Import the type for the crop object (contains pixel-based crop coordinates)
import type { PixelCrop } from "react-image-crop";

// Function to draw the cropped portion of an image onto a canvas
const setCanvasPreview = (
  image: HTMLImageElement, // The original image element to crop from
  canvas: HTMLCanvasElement, // The canvas where we'll draw the cropped result
  crop: PixelCrop // Object containing crop coordinates and dimensions in pixels
): void => {
  // Get the 2D drawing context of the canvas - this is what we use to draw on the canvas
  const ctx = canvas.getContext("2d");

  // Safety check: make sure we got a valid 2D context before proceeding
  if (!ctx) {
    throw new Error("No 2d context");
  }

  console.log("cropping..."); // Debug log to show when cropping starts

  // Get the device pixel ratio (usually 1 for normal screens, 2 for Retina displays)
  // This helps make images look sharp on high-DPI screens
  const pixelRatio = window.devicePixelRatio;

  // Calculate scaling factors between the displayed image size and its natural/original size
  // This is needed because the image might be resized in the browser for display
  const scaleX = image.naturalWidth / image.width; // Horizontal scale factor
  const scaleY = image.naturalHeight / image.height; // Vertical scale factor

  // Set the canvas dimensions to match the cropped area size
  // We multiply by scale factors to get the actual pixel dimensions from the original image
  // We multiply by pixelRatio to handle high-DPI displays for better quality
  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  // Scale the drawing context by the pixel ratio
  // This ensures drawing operations are scaled appropriately for the device
  ctx.scale(pixelRatio, pixelRatio);

  // Set high image smoothing quality for better visual results when scaling
  ctx.imageSmoothingQuality = "high";

  // Save the current drawing context state (so we can restore it later)
  ctx.save();

  // Convert the crop coordinates from display pixels to original image pixels
  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  // Move the drawing context so that the crop area's top-left corner becomes the new origin (0,0)
  // This is like sliding a piece of paper under a printer head to the right starting position
  ctx.translate(-cropX, -cropY);

  // Draw the image onto the canvas:
  ctx.drawImage(
    image, // Source image to draw from
    0, // Source X: start from left edge of original image
    0, // Source Y: start from top edge of original image
    image.naturalWidth, // Source width: use full natural width of original image
    image.naturalHeight, // Source height: use full natural height of original image
    0, // Destination X: draw at left edge of canvas
    0, // Destination Y: draw at top edge of canvas
    image.naturalWidth, // Destination width: use full natural width
    image.naturalHeight // Destination height: use full natural height
  );
  // Because we used ctx.translate(-cropX, -cropY) earlier, the image gets drawn offset
  // This means only the cropped portion (starting at cropX, cropY) will be visible on the canvas
  // The rest gets drawn outside the canvas boundaries and is clipped

  // Restore the drawing context to its original state (removes the translate transformation)
  ctx.restore();
};

// Export the function so it can be used in other files
export default setCanvasPreview;
