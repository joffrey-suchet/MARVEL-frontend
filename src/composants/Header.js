import { Link, useNavigate } from "react-router-dom";

import logo from "../images/Marvel_Logo.svg";
const Header = () => {
  return (
    <div className="background">
      <header>
        <div className="container">
          <img src={logo} alt="logo" />
          <div>
            <Link to="/characters">
              <button>Personnages</button>
            </Link>
            <Link to="/comics">
              <button>Comics</button>
            </Link>
            <button>Favoris</button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
