import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
const NamesNeeded = ["Home", "Add Event"]; //list of things to have in the header
const FilePaths = ["Calender", "AddEvent"];
const Header = () => {
  return (
    <div class="topnav">
      {NamesNeeded.map((name, index) => {
        if (name == currentName) {
          return <a class="active">{name}</a>;
        }
        return (
          <a
            class="inactive"
            onClick={() => {
              useLocation("/" + FilePaths[index]);
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
