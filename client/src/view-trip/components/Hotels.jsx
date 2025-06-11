import Image from "@/components/custom/Image";
import { Link } from "react-router-dom";
const Hotels = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5 mb-3">Hotel Recommendation</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-3">
        {trip.hotels?.map((hotel, index) => (
          <Link
            key={index}
            to={`https://www.google.com/maps/search/?api=1&query=${
              hotel.hotelName + hotel.hotelAddress
            }`}
            target="_blank"
          >
            <div className="hover:scale-105 transition-all cursor-pointer shadow rounded-md h-full">
              <Image
                className="h-80 w-full object-cover rounded-t-xl"
                placename={hotel.hotelName + " Hotel"}
              />
              <div className="my-2 flex flex-col gap-2 p-3">
                <h2 className="font-medium">{hotel.hotelName}</h2>
                <div className="flex items-start gap-1">
                  📍
                  <h2 className="text-xs text-gray-600 font-medium">
                    {hotel.hotelAddress}
                  </h2>
                </div>
                <h2 className="text-sm">💵 {hotel.pricePerNight}</h2>
                <h2 className="text-sm">⭐ {hotel.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
