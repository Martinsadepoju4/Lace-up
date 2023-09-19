import React, { useContext, useEffect, useRef, useState } from "react";
import profileCSS from "./css/profile.module.css";
import Nav from "./components/nav";
import Title from "./components/title";
import Footer from "./components/footer";
import Contactsummary from "./components/contactsummary";
import checkoutCSS from "./css/checkout.module.css";
import Contactform from "./components/contactform";
import Deliveryoptionform from "./components/deliveryoptionform";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changePassword, fetchUserInfo, logOut, logout } from "./apifunctions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./cartcontext";
import Pageloading from "./components/pageloading";

function Profile() {
  const { userLoggedIn, saveUser } = useContext(CartContext);
  useEffect(() => {
    console.log(userLoggedIn);
    if (!userLoggedIn) {
      navigate("/login");
    }
  }, []);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userinfo"],
    queryFn: () => fetchUserInfo(userLoggedIn),
    onSuccess: (data) => {
      const firstAndLastName = data.name.split(" ");
      setContactInfo({
        firstname: firstAndLastName[0],
        lastname: firstAndLastName[1],
        email: data.username,
        telephone: data.telephone,
      });
      setDeliveryInfo({
        firstname: firstAndLastName[0],
        lastname: firstAndLastName[1],
        address: data.address,
        city: data.city,
        postcode: data.postcode,
      });
    },
    onError: (error) => {
      console.log("onERR", error);
    },
    refetchInterval: 150000,
  });
  const mutation = useMutation(
    (newData) => axios.post("http://localhost:5000/edituserdata", newData),
    {
      onSuccess: (data) => {
        const firstAndLastName = data.name.split(" ");
        setContactInfo({
          firstname: firstAndLastName[0],
          lastname: firstAndLastName[1],
          email: data.username,
          telephone: data.telephone,
        });
        setDeliveryInfo({
          firstname: firstAndLastName[0],
          lastname: firstAndLastName[1],
          address: data.address,
          city: data.city,
          postcode: data.postcode,
        });
      },
    }
  );
  const [contactFormCompletion, setContactFormCompletion] = useState(true);
  const [deliveryFormCompletion, setDeliveryFormCompletion] = useState(true);
  const [loginInfoFormCompletion, setLoginInfoFormCompletion] = useState(true);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [oldAndNewPasswords, setOldAndNewPasswords] = useState({});
  const [formDataSource, setFormDataSource] = useState("");
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState({});
  const [deliveryInfo, setDeliveryInfo] = useState({});

  useEffect(() => {
    if (formDataSource === "contact") {
      const body = {
        objectToUpdate: contactInfo,
        userLoggedIn,
      };
      mutation.mutate(body);
      // refetch();
    } else if (formDataSource === "delivery") {
      const body = {
        objectToUpdate: deliveryInfo,
        userLoggedIn,
      };
      mutation.mutate(body);
      // refetch();
    }
  }, [formDataSource]);

  useEffect(() => console.log("useEffect", data), [data]);

  // fetching data mode

  if (!data || isLoading || !contactInfo) {
    return <Pageloading />;
  }
  const editPassword = () => setLoginInfoFormCompletion(false);
  const cancelPasswordSave = () => setLoginInfoFormCompletion(true);

  const clearErrorMessage = (event) => {
    if (passwordErrorMessage) {
      setPasswordErrorMessage(null);
    }
    const { name, value } = event.target;
    setOldAndNewPasswords((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handlePasswordChange = async () => {
    await changePassword(
      oldAndNewPasswords,
      userLoggedIn,
      setPasswordErrorMessage,
      setLoginInfoFormCompletion
    );
  };

  const handleLogout = async () => {
    await logout(saveUser, navigate);
  };

  return (
    <div>
      <Nav linkcolor="black" clsWidth="smallCls" searchIconDisplay="show" />
      <Title name="Account Overview" />
      <div className={profileCSS.main}>
        <div className={profileCSS.persornalInfo}>
          <h1 className={checkoutCSS.header}> Contact Information</h1>
          {contactFormCompletion ? (
            <Contactsummary
              source="contact"
              data={contactInfo}
              completionstate={setContactFormCompletion}
            />
          ) : (
            <Contactform
              completionstate={setContactFormCompletion}
              setContactInfo={setContactInfo}
              setdataSource={setFormDataSource}
              parentcomponent="profile"
              mutation={mutation}
            />
          )}
          <h1 className={checkoutCSS.header}> Delivery Information</h1>
          {deliveryFormCompletion ? (
            <Contactsummary
              source="delivery"
              data={deliveryInfo}
              completionstate={setDeliveryFormCompletion}
            />
          ) : (
            <Deliveryoptionform
              completionstate={setDeliveryFormCompletion}
              setDeliveryInfo={setDeliveryInfo}
              setdataSource={setFormDataSource}
              parentcomponent="profile"
              mutation={mutation}
            />
          )}
          <div>
            <h1>Login Information</h1>
            {loginInfoFormCompletion ? (
              <div>
                <div className="container">
                  <h3>{data.username}</h3>
                  <p>************</p>
                </div>
                <button
                  onClick={editPassword}
                  className="checkoutButton editButton"
                >
                  EDIT PASSWORD
                </button>
              </div>
            ) : (
              <div>
                <div className={checkoutCSS.inputBox}>
                  <input
                    onChange={clearErrorMessage}
                    className={`${checkoutCSS.input} ${checkoutCSS.longInput}`}
                    autoComplete="off"
                    type="password"
                    name="oldpassword"
                    placeholder="OLD PASSWORD"
                  />
                </div>
                <div className={checkoutCSS.inputBox}>
                  <input
                    onChange={clearErrorMessage}
                    className={`${checkoutCSS.input} ${checkoutCSS.longInput}`}
                    autoComplete="off"
                    type="password"
                    name="newpassword"
                    placeholder="NEW PASSWORD"
                  />
                  <span className={checkoutCSS.errorMessage}>
                    {passwordErrorMessage}
                  </span>
                </div>
                <div className={checkoutCSS.cancelAndSaveButton}>
                  <button
                    onClick={cancelPasswordSave}
                    className={checkoutCSS.cancelButton}
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handlePasswordChange}
                    className={checkoutCSS.saveButton}
                  >
                    SAVE PASSWORD <ChevronRightIcon />{" "}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className={"checkoutButton " + profileCSS.button}
        >
          Sign Out <LogoutIcon />
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
