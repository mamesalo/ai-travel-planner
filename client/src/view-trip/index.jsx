import { useState } from "react";
import { useLocation } from "react-router-dom";
import InfoSection from "./components/InfoSection";
import Hotels from "./components/Hotels";
import PlaceToVisit from "./components/PlaceToVisit";
import Footer from "./components/Footer";
import ImportantNotes from "./components/ImportantNotes";
import Header from "@/components/custom/Header";

const ViewTrip = () => {
  const location = useLocation();
  const travelPlan = location.state;
  const extractJson = () => {
    if (!location.state) {
      return null;
    }

    try {
      // --- NEW: Logic to extract and parse JSON ---
      let travelPlanJson = null;
      let importantConsiderationsText = null;

      const jsonStartIndex = location.state.indexOf("```json");
      const jsonEndIndex = location.state.lastIndexOf("```");

      if (
        jsonStartIndex !== -1 &&
        jsonEndIndex !== -1 &&
        jsonEndIndex > jsonStartIndex
      ) {
        // Extract the raw JSON string
        const jsonString = location.state
          .substring(jsonStartIndex + "```json".length, jsonEndIndex)
          .trim();

        try {
          travelPlanJson = JSON.parse(jsonString);
          // Extract the text before the JSON block
          importantConsiderationsText = location.state
            .substring(0, jsonStartIndex)
            .trim();
          return travelPlanJson;
        } catch (parseError) {
          console.error("Failed to parse JSON response from AI:", parseError);
          console.error("AI raw JSON string:", jsonString);
          return travelPlanJson;
          // If JSON parsing fails, you might still want to send the raw text
        }
      } else {
        // If no JSON block is found, treat the whole response as text
        importantConsiderationsText = location.state;
        return travelPlanJson;
      }
    } catch (error) {
      console.error("Error generating travel plan:", error.message);
    }
  };
  const [trip, setTrip] = useState(extractJson());
  if (!travelPlan) return null;

  return (
    <>
      <Header />
      <div className="p-5 md:px-20 lg:px-44 xl:px-52">
        {/* Information Section */}
        <InfoSection trip={trip} />
        {/* Recommended Hotels */}
        <Hotels trip={trip} />
        {/* Daily Plan */}
        <PlaceToVisit trip={trip} />
        {/* Important Notes */}
        <ImportantNotes trip={trip} />
        {/* Footer */}
        <Footer trip={trip} />
      </div>
    </>
  );
};

export default ViewTrip;
