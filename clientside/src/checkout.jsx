import React, { useContext, useEffect, useRef, useState } from "react";
import checkoutCSS from "./css/checkout.module.css";
import Title from "./components/title";
import Nav from "./components/nav";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckoutItemBox from "./components/checkoutItemBox";
import Processorderbutton from "./components/processorderbutton";
import Contactform from "./components/contactform";
import Contactsummary from "./components/contactsummary";
import Deliveryoptionform from "./components/deliveryoptionform";
import { CartContext } from "./cartcontext";
import Footer from "./components/footer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "./apifunctions";
import axios from "axios";
import Pageloading from "./components/pageloading";

export default function Checkout() {
  const { cartItems, userLoggedIn } = useContext(CartContext);
  const { data } = useQuery({
    queryKey: ["userinfo"],
    queryFn: () => fetchUserInfo(userLoggedIn.username),
    onSuccess: (data) => {
      console.log("useQuery onSuccess", data);
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
  });

  const mutation = useMutation(
    (newData) => axios.post("http://localhost:5000/edituserdata", newData),
    {
      onSuccess: () => {
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
  const cartItemsSum = cartItems.length;
  const [contactInfo, setContactInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    telephone: "",
  });
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    postcode: "",
  });
  const [contactFormCompletion, setContactFormCompletion] = useState(true);
  const [deliveryFormCompletion, setDeliveryFormCompletion] = useState(true);
  const [formDataSource, setFormDataSource] = useState("");
  const orderSummaryRef = useRef();
  const navigate = useNavigate();

  // useEffects

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (formDataSource === "contact") {
      const body = {
        objectToUpdate: contactInfo,
        userLoggedIn,
      };
      mutation.mutate(body);
    } else if (formDataSource === "delivery") {
      const body = {
        objectToUpdate: deliveryInfo,
        userLoggedIn,
      };
      mutation.mutate(body);
    }
  }, [formDataSource]);

  if (!data) {
    return <Pageloading />;
  }

  // consts
  const cartItemsTotalPrice = cartItems.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);

  return (
    <div>
      <Nav linkcolor="black" clsWidth="smallCls" searchIconDisplay="show" />
      <Title name="Checkout" />
      <div className={checkoutCSS.main}>
        <div className={checkoutCSS.checkoutInformation}>
          <div className={checkoutCSS.contactInfo}>
            <h1 className={checkoutCSS.header}> Contact Information</h1>
            <p className={checkoutCSS.headerP}>
              Already have an account? <Link to="/login">Please Sign in</Link>
            </p>
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
                parentcomponent="checkout"
                mutation={mutation}
              />
            )}
          </div>

          <div className={checkoutCSS.packageOption}>
            <h1>Package Options</h1>
            <h3>Ship to</h3>
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
          </div>
          <div className={checkoutCSS.review}>
            <h1 className={checkoutCSS.reviewH1}>Review</h1>
            <CheckoutItemBox />
            <div className={checkoutCSS.deliveryWrapper}>
              <h4>SHIPPING SPEED AND COST</h4>
              <ul className={checkoutCSS.delivery}>
                <li>2-6 Working Days</li>
                <li>FREE</li>
              </ul>
            </div>
          </div>
        </div>
        <div ref={orderSummaryRef} className={checkoutCSS.orderSummary}>
          <div className={checkoutCSS.orderItem}>
            <h3>SUBTOTAL:</h3>
            <p>{"$" + cartItemsTotalPrice}</p>
          </div>
          <p className={checkoutCSS.numberOfItem}>{cartItemsSum + " items"}</p>
          <hr />
          <div className={checkoutCSS.orderItem}>
            <h3>SHIPPING:</h3>
            <p>FREE</p>
          </div>
          <hr />
          <div className={checkoutCSS.orderItem}>
            <h3>ORDER TOTAL:</h3>
            <p>{"$" + cartItemsTotalPrice}</p>
          </div>
          <p>VAT included</p>
          <Processorderbutton />
          <p>
            For your protection, Lace Up reserves the right to hold orders for
            complete verification
          </p>
        </div>
      </div>
    </div>
  );
}
