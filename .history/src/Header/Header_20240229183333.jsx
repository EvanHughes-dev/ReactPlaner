import "./Header.css";
import { useNavigate, e } from "react-router-dom";
const NamesNeeded = ["Home", "Add Event"]; //list of things to have in the header

const Header = () => {
  return (
    <div class="topnav">
      {NamesNeeded.map((name) => {
        if (name == currentName) {
          return <a class="active">{name}</a>;
        }
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
