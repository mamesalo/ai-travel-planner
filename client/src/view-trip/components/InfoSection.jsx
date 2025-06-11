import { FaRegHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Image from "@/components/custom/Image";
const InfoSection = ({ trip }) => {
  return (
    <div>
      <Image
        className="h-80 w-full object-cover rounded-xl"
        placename={trip.location}
      />

      <div className="flex justify-between flex-col sm:flex-row sm:items-start mt-2.5">
        <div className="my-5 flex flex-col gap-2 ">
          <h2 className="font-bold text-2xl">{trip.location}</h2>
          <div className="flex flex-wrap items-center gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700  text-sm">
              📅 {trip.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700   text-sm">
              💰 {trip.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700   text-sm">
              🧳 {trip.travelers} Traveler
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
