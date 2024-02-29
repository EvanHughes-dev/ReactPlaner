import "react";
import "./Welcome.css";

import { LogIn, auth } from "./data.js";

const WelcomeScreen = () => {
  const ClickToLogin = () => {
    var value = LogIn();
    console.log(value);
    value.then((data) => {
      if (data.uid !== null) {
        LoggedIn(data);
      } else {
        console.log(data);
      }
    });
  };

  return (
    <div>
      <center>
        <h2>Welcome to STEM Tempest</h2>

        <br />
        <button className="GoogleLoginButton" onClick={ClickToLogin}>
          Google Login
        </button>
        <br />
      </center>
    </div>
  );
};

export { WelcomeScreen as Welcome };
