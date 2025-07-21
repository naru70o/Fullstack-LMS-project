import Image from "next/image";

// Function to render star rating display
export const RenderStars = ({ rating }: { rating: number }) => {
  return (
    <> 
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="w-4 h-4 relative">
          {/* If the current index is less than the integer part of the rating, show a full star */}
          {i < Math.floor(rating) ? (
            <Image src="/assets/Star.svg" alt="Star" className="absolute w-full h-full" fill />
          ) : // If the current index matches the fractional part of the rating, show a half star
          i === Math.floor(rating) && rating - Math.floor(rating) >= 0.1 ? (
            <Image src="/assets/HalfStar.svg" alt="Half Star" className="absolute w-full h-full" fill />
          ) : (
            // Otherwise, render nothing for empty stars
            // You might want to render an empty star image here for visual consistency
            null
          )}
        </div>
      ))}
    </> 
  );
};