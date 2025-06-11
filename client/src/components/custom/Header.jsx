import { Link } from "react-router-dom";
import SignInModal from "./SignInModal";

const Header = () => {
  return (
    <div className="p-3 shadow-sm flex items-center justify-between px-5">
      <Link to="/">
        <img src="/logo.svg" alt="" />
      </Link>
      {/* <div>
        <SignInModal />
      </div> */}
    </div>
  );
};

export default Header;
