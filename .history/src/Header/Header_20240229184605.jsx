import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
const NamesNeeded = ["Home", "Add Event"]; //list of things to have in the header
const FilePaths = ["/Calender", "/AddEvent"];
const Header = () => {
  let location = useLocation();
  let nav = useNavigate();
  return (
    <div class="topnav">
      {NamesNeeded.map((name, index) => {
        console.log(location.pathname);
        if (FilePaths[index] == location.pathname) {
          return <a class="active">{name}</a>;
        }
        return (
          <a
            class="inactive"
            onClick={() => {
              nav(FilePaths[index]);
            }}
          >
            <button class="blankButton">{name}</button>
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
      <img class="ProfilePhoto" src={GetProfilePic()} alt="" />
    </div>
  );
};
