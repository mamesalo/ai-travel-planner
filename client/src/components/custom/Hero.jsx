import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col items-center px-4 gap-9 w-full">
      <h2 className="font-extrabold text-3xl md:text-4xl text-center mt-16 w-full leading-14">
        <span className="text-red-400">
          Discover your next Adventure With AL:
        </span>
        <br />
        Personalized Itineraries at Your Fingertrip
      </h2>
      <p className="tet-xl text-gray-500 text-center">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and buudget
      </p>
      <Link to={"/create-trip"}>
        <Button className="cursor-pointer h-14">Get Started, It's Free</Button>
      </Link>
    </div>
  );
};

export default Hero;
