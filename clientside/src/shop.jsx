import { React, useRef, useEffect, useState, useMemo } from "react";
import Nav from "./components/nav";
import Title from "./components/title";
import Footer from "./components/footer";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
// import { shopdata } from "./data/shopdata";
import Brandset from "./components/brandset";
import Filter from "./components/filter";
import filterCSS from "./components/filter.module.css";
import { Link, useLocation } from "react-router-dom";
import shopCSS from "./css/shop.module.css";
import { ListItem } from "@mui/material";
import MiniNav from "./components/mininav";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getShopData } from "./apifunctions";
import Pageloading from "./components/pageloading";

function Shop() {
  const location = useLocation();
  const locationValue = location.state;
  const [autoDataFetch, setAutoDataFetch] = useState(true);
  const { data, isLoading, error } = useQuery({
    queryKey: ["shopData"],
    queryFn: getShopData,
    onSuccess: (data) => {
      updatenewShopData(data);
      if (locationValue !== null) {
        setAutoDataFetch(false);
        updatefilterquery((prevValue) => {
          return {
            ...prevValue,
            [locationValue.key]: locationValue.value,
          };
        });
      }
    },
    onError: (error) => {
      console.log("onERR", error);
    },
    enabled: autoDataFetch,
  });
  const [newShopData, updatenewShopData] = useState(data);

  const [slicePostion, setslicePostion] = useState({
    start: 0,
    end: 40,
  });
  const [filterquery, updatefilterquery] = useState({
    gender: "",
    price: "",
    vendor: "",
    color: "",
  });
  const [filterState, setfilterState] = useState(false);
  const filter = useRef(null);
  const container = useRef(null);
  const noResultRef = useRef(null);
  const [formerClickedDiv, setFormerClickedDiv] = useState(null);
  const [title, setTitle] = useState();
  const shopMiniNavInfo = [
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

  const numberOfProducts = newShopData?.length;

  const filterShopData = (shopData, filterquery) => {
    if (filterquery.vendor) {
      setTitle(filterquery.vendor);
    } else setTitle("");
    return shopData?.filter((data) => {
      const brandResult = filterquery.vendor
        ? data.vendor.includes(filterquery.vendor.toUpperCase())
        : true;
      const genderResult = filterquery.gender
        ? data.gender === filterquery.gender
        : true;
      const pricesGottenFromCheckbox = filterquery.price
        .split("_")
        .map((element) => Number(element.trim()));
      const priceFromShopData = Number(data.price.replace("$", ""));
      const priceResult =
        filterquery.price !== ""
          ? priceFromShopData >= pricesGottenFromCheckbox[0] &&
            priceFromShopData <= pricesGottenFromCheckbox[1]
          : true;
      const colorResult = filterquery.color
        ? data.color.includes(filterquery.color.toUpperCase())
        : true;
      const result = brandResult && genderResult && priceResult && colorResult;
      return result;
    });
  };

  useMemo(() => {
    const result = filterShopData(data, filterquery);
    updatenewShopData(result);
  }, [filterquery]);

  useEffect(() => {
    if (noResultRef.current) {
      if (numberOfProducts < 1) {
        noResultRef.current.style.display = "flex";
      } else {
        noResultRef.current.style.display = "none";
      }
    }

    if (numberOfProducts < 40) {
      setslicePostion({
        start: 0,
        end: numberOfProducts,
      });
    } else {
      setslicePostion({
        start: 0,
        end: 40,
      });
    }
  }, [newShopData]);

  // useEffect(() => {
  //   if (locationValue !== null) {
  //     setAutoDataFetch(false);
  //     updatefilterquery((prevValue) => {
  //       return {
  //         ...prevValue,
  //         [locationValue.key]: locationValue.value,
  //       };
  //     });
  //   }
  // }, [data]);

  if (!data) {
    return <Pageloading />;
  }

  function showFilter() {
    setfilterState(filterState ? false : true);
    filter.current.classList.toggle(filterCSS.display);
  }

  function handleClick(event) {
    const { name, value, checked, dataset } = event.target;

    if (dataset.name === "color") {
      const currentDivClicked = event.target.parentNode;
      if (!formerClickedDiv) {
        currentDivClicked.classList.add(shopCSS["colorBorder"]);
        setFormerClickedDiv(currentDivClicked);
      } else {
        formerClickedDiv.classList.remove(shopCSS["colorBorder"]);
        currentDivClicked.classList.add(shopCSS["colorBorder"]);
        setFormerClickedDiv(currentDivClicked);
      }
      updatefilterquery((prevValue) => {
        if (prevValue.color === dataset.value) {
          formerClickedDiv.classList.remove(shopCSS["colorBorder"]);
          return {
            ...prevValue,
            color: "",
          };
        } else {
          return {
            ...prevValue,
            [dataset.name]: dataset.value,
          };
        }
      });
    }
    if (checked) {
      updatefilterquery((prevValue) => {
        return {
          ...prevValue,
          [name]: value,
        };
      });
    }
    if (checked === false) {
      updatefilterquery((prevValue) => {
        return {
          ...prevValue,
          [name]: "",
        };
      });
    }
  }

  function handleSearch(event) {
    const searchWords = event.target.value;
    const searchResults = data.filter((data) => {
      const resultFromName = data.name.includes(searchWords.toUpperCase());
      const resultFromvendor = data.vendor.includes(searchWords.toUpperCase());

      if (resultFromName) {
        if (resultFromvendor) {
          return resultFromName && resultFromvendor;
        } else {
          return resultFromName;
        }
      } else return resultFromvendor;
    });
    updatenewShopData(searchResults);
    setTitle(searchWords);
    if (searchResults.length < 1) {
      noResultRef.current.style.display = "flex";
    } else {
      noResultRef.current.style.display = "none";
    }
  }

  function pagination(event) {
    const clickedItem = event.target.innerHTML;
    if (clickedItem === "1") {
      setslicePostion(() => {
        return { start: 0, end: 40 };
      });
    } else if (clickedItem === "2") {
      setslicePostion(() => {
        return { start: 40, end: 80 };
      });
    } else if (clickedItem === "3") {
      setslicePostion(() => {
        return { start: 80, end: 120 };
      });
    } else if (clickedItem.includes("More")) {
      setslicePostion((prevValue) => {
        if (prevValue.end + 40 > numberOfProducts) {
          return { start: prevValue.start, end: numberOfProducts };
        } else {
          return { start: prevValue.start + 40, end: prevValue.end + 40 };
        }
      });
    }
  }
  if (data && newShopData) {
    return (
      <div>
        <Nav
          clsWidth="largeCls"
          searchInputDisplay="show"
          searchFunction={handleSearch}
          linkcolor="black"
        />
        <Title name="SHOP" />
        <div className={shopCSS.products}>
          <div className={shopCSS.miniNav_and_filterIcon}>
            <MiniNav list={shopMiniNavInfo} title={title} />
            <h3 className={shopCSS.h3}>
              {filterState ? "Hide" : "Show"} Filters
              <TuneRoundedIcon
                onClick={showFilter}
                className={shopCSS.filterIcon}
              />
            </h3>
          </div>
          <hr className={shopCSS.hr} />
          <div ref={container} className={shopCSS.productsContainer}>
            {newShopData
              .map((element) => {
                return (
                  <Brandset
                    src={element.images || element.image}
                    alt={element.name}
                    name={element.name}
                    key={element.id}
                    dataSource="shopData"
                    id={element.id}
                    price={element.price}
                    vendor={element.vendor}
                    gender={element.gender}
                    source="shop"
                  />
                );
              })
              .slice(slicePostion.start, slicePostion.end)}
          </div>
          <div ref={noResultRef} className={shopCSS.noResult}>
            <img
              src="https://media.istockphoto.com/id/845452478/vector/illustration-that-a-male-nurse-wearing-a-white-suit-has-a-magnifying-glass.jpg?s=1024x1024&w=is&k=20&c=6g35hsQt8dkcxh_9I1rbHCTcFE689z4CqwUK3a9z01M="
              alt="searchcartoon"
            />
            <p>CHRIST NO!</p>
            <p>
              We couldn't find any results.
              <br />
              Try again or take a look at the products we have selected for you.
            </p>
          </div>
        </div>
        <Filter
          filterRef={filter}
          filterFunction={handleClick}
          filterState={filterState}
        />
        <hr className={shopCSS.secondHr} />
        <div className={shopCSS.miniNavAndMoreContent}>
          <MiniNav list={shopMiniNavInfo} title={title} />

          <ul className={shopCSS.moreContent}>
            <li onClick={pagination}>1</li>
            {numberOfProducts > 40 && <li onClick={pagination}>2</li>}
            {numberOfProducts > 80 && <li onClick={pagination}>3</li>}
            <li className={shopCSS.more} onClick={pagination}>
              More <ArrowRightAltRoundedIcon />
            </li>
          </ul>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Shop;
