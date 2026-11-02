import { MapPin } from "lucide-react";
import type { FairPhoto } from "@/lib/fairs";

// A fair venue's Street View photo, as on healiam.com/fairs. Until the Google Maps key is set
// (NEXT_PUBLIC_GOOGLE_MAPS_KEY) there is no photo, so a map-pin tile keeps the layout.
export function VenuePhoto({ photo, className = "" }: { photo: FairPhoto | null; className?: string }) {
  if (!photo) {
    return (
      <span
        className={`grid place-items-center border border-ink/10 bg-gradient-to-br from-white to-mist text-brand ${className}`}
        aria-hidden="true"
      >
        <MapPin className="h-1/3 max-h-6 w-1/3 max-w-6" strokeWidth={1.8} />
      </span>
    );
  }
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      width={640}
      height={400}
      loading="lazy"
      decoding="async"
      className={`bg-mist object-cover ${className}`}
    />
  );
}
