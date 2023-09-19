import React, { useEffect, useRef, useState } from "react";
import checkoutCSS from "../css/checkout.module.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function Deliveryoptionform(props) {
  const [errorMessage, setErrorMessage] = useState({
    firstname: "",
    lastname: "",
    address: "",
    postcode: "",
    city: "",
  });

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const addressRef = useRef();
  const postcodeRef = useRef();
  const cityRef = useRef();

  const handleDeliveryInfo = () => {
    const firstNameValue = firstNameRef.current.value;
    const lastNameValue = lastNameRef.current.value;
    const addressValue = addressRef.current.value;
    const postcodeValue = postcodeRef.current.value;
    const cityValue = cityRef.current.value;

    if (
      !firstNameValue ||
      !lastNameValue ||
      !addressValue ||
      !postcodeValue ||
      !cityValue
    ) {
      if (!firstNameValue) {
        setErrorMessage((prevValue) => {
          return {
            ...prevValue,
            fName: "Please enter your First name",
          };
        });
      }
      if (!lastNameValue) {
        setErrorMessage((prevValue) => {
          return {
            ...prevValue,
            lName: "Please enter your Last name",
          };
        });
      }
      if (!addressValue) {
        setErrorMessage((prevValue) => {
          return {
            ...prevValue,
            address: "Please enter your delivery address",
          };
        });
      }
      if (!postcodeValue) {
        setErrorMessage((prevValue) => {
          return {
            ...prevValue,
            postcode: "Please enter a valid Postcode",
          };
        });
      }
      if (!cityValue) {
        setErrorMessage((prevValue) => {
          return {
            ...prevValue,
            city: "Please enter your city",
          };
        });
      }
    } else {
      props.setDeliveryInfo({
        name: firstNameValue + " " + lastNameValue,
        address: addressValue,
        city: cityValue,
        postcode: postcodeValue,
      });
      props.setdataSource("delivery");
      if (!props.mutation.isError) {
        setTimeout(() => props.completionstate(true), 4000);
      }
    }
  };

  const validateName = (event) => {
    const { name, value } = event.target;
    if (/[^a-zA-Z\s]/.test(value)) {
      console.log("error");
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
    let newValue = value.replace(/[^0-9]/, "");
    newValue = newValue.slice(0, 5);
    event.target.value = newValue;
    if (errorMessage.postcode) {
      setErrorMessage((prevValue) => {
        return {
          prevValue,
          address: "",
        };
      });
    }
  };

  const cancelSave = () => props.completionstate(true);

  return (
    <div>
      <div>
        <div className={checkoutCSS.nameInputs}>
          <div className={checkoutCSS.inputBox}>
            <input
              ref={firstNameRef}
              onChange={validateName}
              className={checkoutCSS.smallInput}
              autoComplete="off"
              type="text"
              name="firstname"
              placeholder="FIRST NAME*"
            />
            <span className={checkoutCSS.errorMessage}>
              {errorMessage.firstname}
            </span>
          </div>
          <div className={checkoutCSS.inputBox}>
            <input
              ref={lastNameRef}
              onChange={validateName}
              className={checkoutCSS.smallInput}
              autoComplete="off"
              type="text"
              name="lastname"
              placeholder="LAST NAME*"
            />
            <span className={checkoutCSS.errorMessage}>
              {errorMessage.lastname}
            </span>
          </div>
        </div>
        <div className={checkoutCSS.inputBox}>
          <input
            ref={addressRef}
            className={`${checkoutCSS.input} ${checkoutCSS.longInput}`}
            autoComplete="off"
            type="text"
            placeholder="ADDRESS 1*"
          />
          <span className={checkoutCSS.errorMessage}>
            {errorMessage.address}
          </span>
        </div>
        <div className={checkoutCSS.inputBox}>
          <input
            className={`${checkoutCSS.input} ${checkoutCSS.longInput}`}
            autoComplete="off"
            type="text"
            placeholder="ADDRESS 2*"
          />
        </div>
      </div>
      <div className={checkoutCSS.postalAndCity}>
        <div className={checkoutCSS.inputBox}>
          <input
            ref={postcodeRef}
            onChange={validateNumber}
            className={checkoutCSS.smallInput}
            autoComplete="off"
            type="text"
            name="postcode"
            placeholder="POSTAL CODE*"
          />
          <span className={checkoutCSS.errorMessage}>
            {errorMessage.postcode}
          </span>
        </div>
        <div className={checkoutCSS.inputBox}>
          <input
            onChange={validateName}
            ref={cityRef}
            className={checkoutCSS.smallInput}
            autoComplete="off"
            type="text"
            name="city"
            placeholder="CITY*"
          />
          <span className={checkoutCSS.errorMessage}>{errorMessage.city}</span>
        </div>
      </div>
      <div className={checkoutCSS.deliveryWrapper}>
        <h4>SHIPPING SPEED AND COST</h4>
        <ul className={checkoutCSS.delivery}>
          <li>2-6 Working Days</li>
          <li>FREE</li>
        </ul>
      </div>
      <div className={checkoutCSS.cancelAndSaveButton}>
        <button onClick={cancelSave} className={checkoutCSS.cancelButton}>
          CANCEL
        </button>
        <button
          onClick={handleDeliveryInfo}
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
