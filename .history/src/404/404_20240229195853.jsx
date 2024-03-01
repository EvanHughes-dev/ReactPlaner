const Page404 = () => {
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
