import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const BASE_URL = "http://localhost:5020/api";

export const buildTravelPlanPrompt = (query) => {
  let prompt = `Generate Travel Plan for Location : ${query.location.formatted} for ${query.noOfDays} days for ${query.traveler} with a ${query.budget}, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for ${query.noOfDays} days with each day two places plan with best time to visit also include Important Considerations Before You Book  Return the result in valid JSON format with the following structure: 
  {
  noOfDays: "",
  location: "",
  budget: "",
  travelers: "",
  hotels: [
    {
      hotelName: "",
      hotelAddress: "",
      pricePerNight: "",
      placeImageName: "",
      bookingUrl: "",
      coordinates: {
        lat: "",
        lon: "",
      },
      rating: "",
      description: "",
    },
  ],
  itinerary: {
    "day 1 ": [
      {
        placeName: "",
        placeAdress: "",
        placeDetails: "",
        ticketPricing: "",
        timeTravel: "",
        bestTimeToVisit: "",
        openingTime: "",
      },
    ],
  },
  "importantConsiderations":[]
}`;
  return prompt;
};
