import "react";

const WelcomeScreen = () => {
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

export default WelcomeScreen;
