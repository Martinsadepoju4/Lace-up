import { React, useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginCSS from "./css/login.module.css";
import { CartContext } from "./cartcontext";
import { loginUser, registerUser } from "./apifunctions";

export default function Login() {
  const { userLoggedIn, saveUser } = useContext(CartContext);
  useEffect(() => {
    console.log(userLoggedIn);

    if (userLoggedIn) {
      navigate("/profile");
    }
  }, []);
  const [loginState, updateLoginState] = useState(true);
  const [signupinfo, setSignupInfo] = useState({});
  const [logininfo, setLoginInfo] = useState({});
  const firstDivMainRef = useRef(null);
  const navigate = useNavigate();
  const signupMessage =
    "Step into style. Sign up now for exclusive access to the hottest sneakers and limited editions. Join the sneaker community today!";
  const loginMessage =
    "Step into a world of style and comfort. Log in and lace up!";

  function loginSwitch() {
    updateLoginState((prevalue) => (prevalue ? false : true));
    firstDivMainRef.current.classList.toggle(loginCSS["reduceHeight"]);
  }

  const handleSignInfo = (event) => {
    console.log(signupinfo);
    const { name, value } = event.target;
    setSignupInfo((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const handleLoginInfo = (event) => {
    console.log(logininfo);
    const { name, value } = event.target;
    setLoginInfo((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    console.log("sign up clicked");
    await registerUser(signupinfo, navigate, saveUser);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    await loginUser(logininfo, navigate, saveUser);
  };

  return (
    <div className={loginCSS.body}>
      <div className={loginCSS.firstDiv}>
        <Link to="/">
          <h2 className={loginCSS.logo}>
            [LACE<span>UP]</span>
          </h2>
        </Link>
        <div ref={firstDivMainRef} className={loginCSS.firstDivMain}>
          <div className={loginCSS.formHeader}>
            <h2>{loginState ? "Log in" : "Create an account"}</h2>
            <p>{loginState ? loginMessage : signupMessage}</p>
          </div>
          {loginState ? (
            <form onSubmit={loginUser} className={loginCSS.form}>
              <input
                onChange={handleLoginInfo}
                name="username"
                autoComplete="off"
                type="email"
                placeholder="Email"
              />
              <input
                onChange={handleLoginInfo}
                name="password"
                autoComplete="off"
                type="password"
                placeholder="Password"
              />
              <p className={loginCSS.signUpText}>
                Don't have an account?{" "}
                <span className={loginCSS.signUpSpan} onClick={loginSwitch}>
                  Sign Up
                </span>
              </p>
              <button
                type="submit"
                onClick={handleLogin}
                className={loginCSS.firstFormButton}
              >
                Log in
              </button>
              <button className={loginCSS.secondFormButton}>
                Sign in with Google
              </button>
            </form>
          ) : (
            <form className={loginCSS.form}>
              <input
                onChange={handleSignInfo}
                name="name"
                type="text"
                placeholder="Name"
              />
              <input
                onChange={handleSignInfo}
                name="username"
                autoComplete="off"
                type="email"
                placeholder="Email"
              />
              <input
                onChange={handleSignInfo}
                name="password"
                autoComplete="off"
                type="password"
                placeholder="Password"
              />
              <p className={loginCSS.signUpText}>
                Have an account?{" "}
                <span className={loginCSS.signUpSpan} onClick={loginSwitch}>
                  Log In
                </span>
              </p>
              <button
                onClick={handleSignUp}
                className={loginCSS.firstFormButton}
              >
                create account
              </button>
              <button className={loginCSS.secondFormButton}>
                Sign up with Google
              </button>
            </form>
          )}
        </div>
      </div>
      <div className={loginCSS.secondDiv}>
        <button onClick={loginSwitch}>
          {loginState ? "Sign up" : "Log in"}
        </button>
      </div>
    </div>
  );
}
