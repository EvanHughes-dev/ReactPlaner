import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
const NamesNeeded = ["Home", "Add Event"]; //list of things to have in the header

const Header = () => {
  return (
    <div class="topnav">
      {NamesNeeded.map((name) => {
        return (
          <a
            class="inactive"
            onClick={() => {
              setName(name);
            }}
          >
            <button class="blankButton">{name}</button>
          </a>
        );
      })}
    </div>
  );
};

export default Header;
