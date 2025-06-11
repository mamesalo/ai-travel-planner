import PlaceCarditem from "./PlaceCarditem";

const PlaceToVisit = ({ trip }) => {
  return (
    <div className="mt-9">
      <h2 className="font-bold text-lg">Place to Visit</h2>
      <div>
        {Object.keys(trip.itinerary)?.map((key) => (
          <div key={key} className="mt-5">
            <h2 className="font-medium text-lg capitalize mb-3">📅 {key}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {trip.itinerary[key]?.map((plan, index) => (
                <div key={index} className="mb-5">
                  <h2 className="text-xs text-orange-600 font-medium">
                    {plan.openingTime}
                  </h2>
                  <PlaceCarditem place={plan} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceToVisit;
