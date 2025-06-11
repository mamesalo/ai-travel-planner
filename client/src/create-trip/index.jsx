import AddressAutocomplete from "@/components/custom/AddressAutocomplete";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectBudgetOption, SelectTravelesList } from "@/constants/options";
import { BASE_URL, buildTravelPlanPrompt } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const CreateTrip = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const onGenerateTrip = async () => {
    if (
      !formData.budget ||
      !formData.traveler ||
      !formData.location ||
      !formData.noOfDays
    ) {
      console.log("m=not working");
      return toast.error(
        `Please fill in all the required fields to get your travel suggestions.`
      );
    }
    if (formData.noOfDays <= 0) {
      return toast.error(
        `The number of days cannot be zero or a negative value. Please enter a positive number.`
      );
    }
    if (formData.noOfDays > 8) {
      return toast.error(`Max number of days should not exceed 8 .`);
    }

    setLoading(true);
    const data = localStorage.getItem("sample");
    const prompt = buildTravelPlanPrompt(formData);
    const promise = () =>
      axios.post(`${BASE_URL}/generate-travel-plan`, {
        prompt,
      });

    toast.promise(promise, {
      loading: "Generating your travel plan..",
      success: (response) => {
        localStorage.setItem("sample", response.data);

        setLoading(false);
        navigate("/view-trip", { state: response.data });
        return `Your personalized travel plan is ready! Enjoy your adventure.`;
      },
      error: () => {
        setLoading(false);
        return "Uh oh! We couldn't generate your travel plan right now. Please try again or adjust your preferences";
      },
    });
  };

  return (
    <>
      <Header />
      <div className="sm:px-10 md:px-15 lg:px-24 xl:px-10 px-5 mt-10 w-full">
        <h2 className="font-bold text-3xl">
          Tell us your travel preferences 🏕️🌲
        </h2>
        <p className="mt-3 text-gray-500 text-lg">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preferences.
        </p>
        <div className="mt-20 space-y-9">
          <div>
            <h2 className="text-xl my-3 font-medium">
              What is destination of choice?
            </h2>
            <AddressAutocomplete
              onPlaceSelected={(place) => handleInputChange("location", place)}
            />
          </div>
          <div>
            <h2 className="text-xl my-3 font-medium">
              How many days are you planing your trip
            </h2>
            <Input
              placeholder="Ex.3"
              type="number"
              className="max-w-lg border-gray-500"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>
        </div>
        <div className="mt-9">
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="cursor-pointer grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 max-w-5xl">
            {SelectBudgetOption.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg ${
                  formData.budget == item.title
                    ? `shadow-lg border-black border-2`
                    : `border-gray-400`
                }`}
              >
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.decs}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-9">
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="cursor-pointer grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 max-w-5xl">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-4 border  rounded-lg hover:shadow-lg ${
                  formData.traveler == item.people
                    ? `shadow-lg border-black border-2`
                    : `border-gray-400`
                }`}
              >
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.decs}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 justify-end flex">
          {!loading && <Button onClick={onGenerateTrip}> Generate Trip</Button>}
        </div>
      </div>
    </>
  );
};

export default CreateTrip;
