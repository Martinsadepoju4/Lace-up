import React, { useEffect, useRef, useState } from "react";
import productCSS from "./css/product.module.css";
import Nav from "./components/nav";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Footer from "./components/footer";
import { Checkbox } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Title from "./components/title";
import { shopdata, reviews, newArrival, trending } from "./data/shopdata";
import Review from "./components/review";
import { useContext } from "react";
import { CartContext } from "./cartcontext";
import MiniNav from "./components/mininav";
import { useQuery } from "@tanstack/react-query";
import { fetchNewArrival, fetchTrending, getShopData } from "./apifunctions";
import Cartitem from "./components/cartitem";

export default function Product() {
  // const { shopData, setShopData } = useState(null);
  const {
    data: shopdata,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["shopData"],
    queryFn: getShopData,
    onSuccess: (data) => {
      // setShopData(data);
    },
    onError: (error) => {
      console.log("onERR", error);
    },
    // refetchInterval: 150000,
    enabled: false,
  });
  const { data: trendData, error: trendError } = useQuery({
    queryKey: ["trendquery"],
    queryFn: fetchTrending,
    onError: (trendError) => {
      console.log("onERR", trendError);
    },
  });

  const { data: newArrData, error: newArrivalError } = useQuery({
    queryKey: ["newarrivalquery"],
    queryFn: fetchNewArrival,
    onError: (error) => {
      console.log("onERR", error);
    },
  });
  // useEffect(() => {
  //   const result = shopData;

  // }, []);
  const { cartItems, saveItems } = useContext(CartContext);
  const sizes = [
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
  ];
  const [descState, setDescState] = useState(true);
  const firstHeader = useRef(null);
  const secondHeader = useRef(null);
  const { dataSource, id } = useParams();
  const productMiniNavInfo = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "Shop",
      link: "/shop",
    },
    {
      text: "",
      link: "#",
    },
  ];

  const item = () => {
    let array;
    if (dataSource === "trending") {
      array = trendData;
    } else if (dataSource === "newArrival") {
      array = newArrData;
    } else if (dataSource === "shopData") array = shopdata;
    return array.filter((data) => {
      return data.id === Number(id);
    });
  };

  var selectedItem = item();
  selectedItem = selectedItem[0];

  const toTrue = () => {
    setDescState(true);
    if (secondHeader.current.classList.contains(productCSS["active"])) {
      secondHeader.current.classList.remove(productCSS["active"]);
      firstHeader.current.classList.add(productCSS["active"]);
    } else firstHeader.current.classList.add(productCSS["active"]);
  };
  const toFalse = () => {
    setDescState(false);
    if (firstHeader.current.classList.contains(productCSS["active"])) {
      firstHeader.current.classList.remove(productCSS["active"]);
      secondHeader.current.classList.add(productCSS["active"]);
    } else secondHeader.current.classList.add(productCSS["active"]);
  };

  // function addItem(name, price, src, vendor) {
  //   const newPrice = Number(price.replace("$", ""));
  //   const data = [
  //     ...Cartitems,
  //     {
  //       name: name,
  //       price: newPrice,
  //       img: src,
  //       vendor: vendor,
  //     },
  //   ];
  //   saveItems(data);
  // }
  function addItem(name, price, src, vendor, gender) {
    const newPrice = Number(price.replace("$", ""));
    const data = [
      ...cartItems,
      {
        name: name,
        price: newPrice,
        img: src,
        vendor: vendor,
        gender: gender,
      },
    ];
    saveItems(data);
  }

  return (
    <div>
      <Nav linkcolor="black" searchIconDisplay="show" clsWidth="smallCls" />
      <Title name="Product" />
      <div className={productCSS.mininavContainer}>
        {" "}
        <MiniNav
          list={productMiniNavInfo}
          title={selectedItem.name.toLowerCase()}
        />{" "}
      </div>
      <div className={productCSS.container}>
        <div className={productCSS.productBox}>
          <img
            src={selectedItem.images || selectedItem.image}
            className={productCSS.productImage}
            alt="shoe"
          />
          <div className={productCSS.productDetails}>
            <h1 className={productCSS.header}>{selectedItem.name}</h1>
            <p className={productCSS.gender}>{selectedItem.gender}</p>
            <h2>{selectedItem.price}</h2>
            <p>Color: {selectedItem.color.map((color) => " / " + color)}</p>
            <label for="size-select">Choose a size: </label>
            <br />
            <select name="size" id="size-select">
              <option value="">--Please choose an option--</option>
              {sizes.map((size) => (
                <option value={size}>{size}</option>
              ))}
            </select>
            <div className={productCSS.shippingBox}>
              <h3 className={productCSS.topBox}>
                <LocalShippingOutlinedIcon />
                Ship to me
              </h3>
              <p className={productCSS.or}>OR</p>
              <div className={productCSS.baseBox}>
                <div className={productCSS.inputBox}>
                  <input type="checkbox"></input>
                  <div>
                    <h3>Pick Up In Store</h3>
                    <p>Select your local store to grab your order</p>
                    <Link to="/about">Show nearby stores</Link>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="checkoutButton"
              onClick={() =>
                addItem(
                  selectedItem.name,
                  selectedItem.price,
                  selectedItem.src,
                  selectedItem.vendor
                )
              }
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <div className={productCSS.descBox}>
          <div className={productCSS.descHeaders}>
            <h3
              ref={firstHeader}
              onClick={toTrue}
              className={productCSS.active}
            >
              Details
            </h3>
            <h3 ref={secondHeader} onClick={toFalse}>
              Reviews ⭐⭐⭐⭐⭐({reviews.length})
            </h3>
          </div>
          <hr className={productCSS.hr} />
          {descState ? (
            <div className={productCSS.details}>
              <p>Product #: 314210656204</p>
              <p>
                Inspired by the beach but made for city streets, the Nike Air
                Max Plus Utility gets a rugged upgrade perfect for your urban
                adventures. We added a sturdy suede mudguard to its breathable
                knit upper and tightened the look up with an extra set of
                toggle-closure laces for a secure and supportive fit. Plus,
                visible Max Air units in the forefoot and heel provide a Tuned
                Air experience that blends comfort with defiant
                style.BenefitsExtra lace set tightens with a toggle and feeds
                through loops anchored to the mudguard.Originally designed for
                performance running, Max Air units provide lightweight
                cushioning that lasts.Real and synthetic leather is paired with
                airy knits and mesh to provide breathability, durability and
                support.Rubber outsole gives you durable traction.Product
                DetailsFoam in midsoleReflective design detailsNot intended for
                use as Personal Protective Equipment (PPE)
              </p>
            </div>
          ) : (
            <div className={productCSS.scrollContainer}>
              {reviews.map((data) => {
                return (
                  <Review
                    image={data.customerImage}
                    name={data.customerName}
                    content={data.reviewMessage}
                    rating={data.ratingStars}
                    header={data.reviewHeader}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
