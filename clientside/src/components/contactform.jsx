import React, { useContext, useEffect, useRef, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import checkoutCSS from "../css/checkout.module.css";
import { CartContext } from "../cartcontext";

export default function Contactform(props) {
  const { userLoggedIn, setUserLoggedIn } = useContext(CartContext);
  const fNameRef = useRef();
  const lNameRef = useRef();
  const emailRef = useRef();
  const telephoneRef = useRef();

  const [errorMessage, setErrorMessage] = useState({
    fName: "",
    lName: "",
    email: "",
    telephone: "",
  });

  const handleContactInfo = () => {
    console.log(fNameRef.current.value === "");
    const fNameValue = fNameRef.current.value;
    const lNameValue = lNameRef.current.value;
    const emailValue = emailRef.current.value;
    const telephoneValue = telephoneRef.current.value;

    if (
      fNameValue === "" ||
      lNameValue === "" ||
      emailValue === "" ||
      telephoneValue === ""
    ) {
      if (fNameValue === "") {
        setErrorMessage((prevValue) => {
          return {
            ...prevValue,
            fName: "Please enter your First name",
          };
        });
      }
      if (lNameValue === "") {
        setErrorMessage((prevValue) => {
          return {
            ...prevValue,
            lName: "Please enter your Last name",
          };
        });
      }
      if (emailValue === "") {
        setErrorMessage((prevValue) => {
          return {
            ...prevValue,
            email: "Please enter your email in this format: name@company.com.",
          };
        });
      }
      if (telephoneValue === "") {
        setErrorMessage((prevValue) => {
          return {
            ...prevValue,
            telephone: "Please check your Telephone number and try again",
          };
        });
      }
    } else {
      userLoggedIn.username !== emailValue &&
        setUserLoggedIn({ username: emailValue });
      props.setContactInfo(() => {
        return {
          name: fNameValue + " " + lNameValue,
          username: emailValue,
          telephone: telephoneValue,
        };
      });
      props.setdataSource("contact");
      if (!props.mutation.isError) {
        setTimeout(() => props.completionstate(true), 4000);
      }
    }
  };

  // useEffect(()=>console.log(contactInfo),[contactInfo])

  const validateName = (event) => {
    const { name, value } = event.target;
    if (/[^a-zA-Z\s]/.test(value)) {
      setErrorMessage((prevValue) => {
        return {
          ...prevValue,
          [name]: "specific characters and numbers are not supported",
        };
      });
    } else {
      setErrorMessage((prevValue) => {
        return {
          ...prevValue,
          [name]: "",
        };
      });
    }
  };

  const validateNumber = (event) => {
    const value = event.target.value;
    const newValue = value.replace(/[^0-9]/, "");
    event.target.value = newValue;
  };
  const validateEmail = (event) => {
    const value = event.target.value;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) === false) {
      console.log("Please enter your email in this format: name@company.com.");
      setErrorMessage((prevValue) => {
        return {
          ...prevValue,
          email: "Please enter your email in this format: name@company.com.",
        };
      });
    } else {
      setErrorMessage((prevValue) => {
        return {
          ...prevValue,
          email: "",
        };
      });
    }
  };

  const cancelSave = () => props.completionstate(true);

  return (
    <div>
      <div className={checkoutCSS.form}>
        <div className={checkoutCSS.nameInputs}>
          <div className={checkoutCSS.inputBox}>
            <input
              ref={fNameRef}
              onChange={validateName}
              className={checkoutCSS.smallInput}
              autoComplete="off"
              type="text"
              name="fName"
              placeholder="FIRST NAME*"
            />
            <span className={checkoutCSS.errorMessage}>
              {errorMessage.fName}
            </span>
          </div>

          <div className={checkoutCSS.inputBox}>
            <input
              ref={lNameRef}
              onChange={validateName}
              className={checkoutCSS.smallInput}
              autoComplete="off"
              type="text"
              name="lName"
              placeholder="LAST NAME*"
            />
            <span className={checkoutCSS.errorMessage}>
              {errorMessage.lName}
            </span>
          </div>
        </div>
        <div className={checkoutCSS.inputBox}>
          <input
            ref={emailRef}
            onChange={validateEmail}
            className={`${checkoutCSS.input} ${checkoutCSS.longInput}`}
            autoComplete="off"
            type="email"
            name="email"
            placeholder="EMAIL**"
          />
          <span className={checkoutCSS.errorMessage}>{errorMessage.email}</span>
        </div>
        <div className={checkoutCSS.inputBox}>
          <input
            ref={telephoneRef}
            onChange={validateNumber}
            className={`${checkoutCSS.input} ${checkoutCSS.longInput}`}
            autoComplete="off"
            type="telephone"
            name="telephone"
            placeholder="TELEPHONE*"
          />
          <span className={checkoutCSS.errorMessage}>
            {errorMessage.telephone}
          </span>
        </div>
      </div>
      <div className={checkoutCSS.cancelAndSaveButton}>
        <button onClick={cancelSave} className={checkoutCSS.cancelButton}>
          CANCEL
        </button>
        <button
          type="submit"
          onClick={handleContactInfo}
          className={checkoutCSS.saveButton}
          disabled={props.mutation.isLoading}
        >
          {props.mutation.isLoading ? "SAVING..." : "SAVE & CONTINUE "}{" "}
          <ChevronRightIcon />
        </button>
      </div>
      {props.mutation.isError && (
        <div>Error: {props.mutation.error.message}</div>
      )}
      {props.mutation.isSuccess && <div>Data saved successfully!</div>}
    </div>
  );
}
