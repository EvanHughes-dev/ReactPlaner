import { useNavigate } from "react-router-dom";
const Page404 = () => {
  let nav = useNavigate();
  const ClickToLogin = () => {
    var value = LogIn();

    value.then((data) => {
      if (data.uid !== null) {
        LoggedIn(data);
        nav("/Calender");
      }
    });
  };

  return (
    <div className="wholeThing">
      <p className="welcomeTitle">Welcome To</p>

      <div className="mfTitle">
        <h1 className="titleSTEM">STEM</h1>
        <h1 className="titleAE"> TEMPEST</h1>
      </div>

      <button className="buttonSignIn" onClick={ClickToLogin}>
        Sign In With Google
      </button>
    </div>
  );
};

export { Page404 };
