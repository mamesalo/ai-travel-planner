import Placeholder from "@/assets/placeholder.jpg";
import Image from "@/components/custom/Image";
import { Link } from "react-router-dom";
const PlaceCarditem = ({ place }) => {
  return (
    <Link
      target="_blank"
      to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`}
    >
      <div className="border rounded-xl p-3 mt-2 flex flex-col sm:flex-row gap-5 hover:scale-105 hover:shadow-md transition-all h-full">
        <Image
          className="max-w-52 w-full h-52 rounded object-cover"
          placename={place.placeName}
        />
        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-400 mt-1">{place.placeDetails}</p>
          <h2 className="text-sm mt-2.5">⏰ {place.bestTimeToVisit}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCarditem;
