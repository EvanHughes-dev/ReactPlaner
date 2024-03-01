import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import profile from "./Assests/DefaultProfilePic.jpg"; //default user profile in case of error
const NamesNeeded = ["Home", "Add Event"]; //list of things to have in the header
const FilePaths = ["/Calender", "/AddEvent"];
const Header = () => {
  let location = useLocation();
  let nav = useNavigate();
  return (
    <div className="topnav">
      {NamesNeeded.map((name, index) => {
        if (FilePaths[index] == location.pathname) {
          return (
            <a key={name} className="active">
              {name}
            </a>
          );
        }
        return (
          <a
            key={name}
            className="inactive"
            onClick={() => {
              nav(FilePaths[index]);
            }}
          >
            <button className="blankButton">{name}</button>
          </a>
        );
      })}
      <ProfileViewObject />
    </div>
  );
};

export default Header;

const ProfileViewObject = () => {
  return (
    <div className="ProfileViewHolder">
      <img className="ProfilePhoto" src={GetProfilePic()} alt={profile}}/>
    </div>
  );
};

function GetProfilePic() {
  /*
   * displays the user's image if there is one
   * otherwise returns default image
   * Called from head = ();
   */

  if (window.sessionStorage.getItem("CurrentProfilePhoto") === null) {
    return profile;
  } else {
    return window.sessionStorage.getItem("CurrentProfilePhoto");
  }
}
