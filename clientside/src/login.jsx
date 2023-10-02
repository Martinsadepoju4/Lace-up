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
  const [errorMessage, setErrorMessage] = useState("");
  const [validationError, setValidationError] = useState({});
  const signupMessage =
    "Step into style. Sign up now for exclusive access to the hottest sneakers and limited editions. Join the sneaker community today!";
  const loginMessage =
    "Step into a world of style and comfort. Log in and lace up!";

  const validateName = (event) => {
    const { name, value } = event.target;
    console.log("name validator", value);
    if (/^[A-Za-z\s]+$/.test(value)) {
      setValidationError((prevValue) => {
        return {
          ...prevValue,
          [name]: "",
        };
      });
    } else {
      console.log("not a match");
      setValidationError((prevValue) => {
        return {
          ...prevValue,
          [name]:
            "please write name in this format *John Doe* with no number or symbol ",
        };
      });
    }
  };

  const validateEmail = (event) => {
    const value = event.target.value;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) === false) {
      setValidationError((prevValue) => {
        return {
          ...prevValue,
          email: "Please enter your email in this format: name@company.com.",
        };
      });
    } else {
      setValidationError((prevValue) => {
        return {
          ...prevValue,
          email: "",
        };
      });
    }
  };
  const validatePassword = (event) => {
    const value = event.target.value;
    if (value.length < 5) {
      setValidationError((prevValue) => {
        return {
          ...prevValue,
          password: "your password must be at least 5 characters.",
        };
      });
    } else {
      setValidationError((prevValue) => {
        return {
          ...prevValue,
          password: "",
        };
      });
    }
  };

  function loginSwitch() {
    updateLoginState((prevalue) => (prevalue ? false : true));
    setErrorMessage("");
    setValidationError({});
    firstDivMainRef.current.classList.toggle(loginCSS["reduceHeight"]);
  }

  const handleSignInfo = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      validateName(event);
    } else if (name === "username") {
      validateEmail(event);
    } else {
      validatePassword(event);
    }
    setSignupInfo((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const handleLoginInfo = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      validateEmail(event);
    } else if (name === "password") {
      validatePassword(event);
    }
    setLoginInfo((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (
      signupinfo.name &&
      signupinfo.username &&
      signupinfo.password &&
      validationError.email === "" &&
      validationError.password === "" &&
      validationError.name === ""
    ) {
      await registerUser(signupinfo, navigate, saveUser, setErrorMessage);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (
      logininfo.username &&
      logininfo.password &&
      validationError.email === "" &&
      validationError.password === ""
    ) {
      await loginUser(logininfo, navigate, saveUser, setErrorMessage);
    }
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
              {validationError.email && (
                <div className={loginCSS.validationMessage}>
                  {validationError.email}
                </div>
              )}
              <input
                onChange={handleLoginInfo}
                name="password"
                autoComplete="off"
                type="password"
                placeholder="Password"
              />
              {validationError.password && (
                <div className={loginCSS.lastvalidationMessage}>
                  {validationError.password}
                </div>
              )}
              {errorMessage && (
                <div className={loginCSS.errorMessage}>{errorMessage}</div>
              )}
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
                placeholder="Firstname and Lastname"
              />
              {validationError.name && (
                <div className={loginCSS.validationMessage}>
                  {validationError.name}
                </div>
              )}
              <input
                onChange={handleSignInfo}
                name="username"
                autoComplete="off"
                type="email"
                placeholder="Email"
              />
              {validationError.email && (
                <div className={loginCSS.validationMessage}>
                  {validationError.email}
                </div>
              )}
              <input
                onChange={handleSignInfo}
                name="password"
                autoComplete="off"
                type="password"
                placeholder="Password"
              />
              {validationError.password && (
                <div className={loginCSS.lastvalidationMessage}>
                  {validationError.password}
                </div>
              )}
              {errorMessage && (
                <div className={loginCSS.errorMessage}>{errorMessage}</div>
              )}
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
