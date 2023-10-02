import { React, useRef, useEffect, useState } from "react";
import Header from "./components/header";
import Holder from "./components/holder";
import { categories, classes, newArrival, trending } from "./data/shopdata";
import Brandcard from "./components/brandcard";
import Footer from "./components/footer";
import homeCSS from "./css/home.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { fetchBrands, fetchNewArrival, fetchTrending } from "./apifunctions";
import Pageloading from "./components/pageloading";

function Home() {
  const navigate = useNavigate();
  const [trendingData, setTrendingData] = useState(null);
  const [newArrivalData, setNewArrivalData] = useState(null);
  const [brandsData, setBrandsData] = useState(null);
  const [imgsLoaded, setImgsLoaded] = useState(false);

  const { data: trendData, error: trendError } = useQuery({
    queryKey: ["trendquery"],
    queryFn: fetchTrending,
    onSuccess: (trendData) => {
      setTrendingData(trendData);
    },
    onError: (trendError) => {
      console.log("onERR", trendError);
    },
  });
  const { data: brandData, error: brandError } = useQuery({
    queryKey: ["brandquery"],
    queryFn: fetchBrands,
    onSuccess: (data) => {
      setBrandsData(data);
    },
    onError: (brandError) => {
      console.log("onERR", brandError);
    },
  });
  const { data: newArrData, error: newArrivalError } = useQuery({
    queryKey: ["newarrivalquery"],
    queryFn: fetchNewArrival,
    onSuccess: (data) => {
      setNewArrivalData(data);
    },
    onError: (error) => {
      console.log("onERR", error);
    },
  });
  // useEffect to check if header images are fully loaded
  useEffect(() => {
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image.url;
        // wait 2 seconds to simulate loading time
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(image.url);
          }, 1000);

        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.all(classes.map((image) => loadImage(image)))
      .then(() => setImgsLoaded(true))
      .catch((err) => console.log("Failed to load images", err));
  }, []);

  if (!brandsData || !trendingData || !newArrivalData || !imgsLoaded) {
    return <Pageloading />;
  }

  const toLogin = () => {
    navigate("/login");
  };
  const toAbout = () => {
    navigate("/about");
  };

  if (brandsData && trendingData && newArrivalData) {
    return (
      <div>
        <Header />
        <section id={homeCSS.aboutSection}>
          <img
            src="https://i.pinimg.com/564x/05/4d/19/054d19c121a297209dc880b088237230.jpg"
            className={homeCSS.newAboutImage}
            alt="shoe"
          />
          <div className={homeCSS.aboutImages}>
            <img
              src="https://www.rei.com/dam/content_team_010818_52427_htc_running_shoes_hero2_lg.jpg"
              alt="sneakers"
            />
            <img
              src="https://i.pinimg.com/736x/0d/2c/95/0d2c95ca347c098ce536c2482f7ceffe.jpg"
              alt="new balance"
            />
            <img
              src="https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/64265cce-0cfc-4309-aa45-33835124eeaa/the-best-nike-high-top-sneakers-you-can-buy-right-now-articles-ogc.jpg"
              alt="nike"
            />
          </div>
          <div className={homeCSS.aboutText}>
            <h4>ABOUT US</h4>
            <h2>Founded by sneaker enthusiasts</h2>
            <p>
              Our journey began with a simple idea: to provide fellow
              sneakerheads with a curated selection of the hottest kicks, latest
              releases, and timeless classics.
            </p>
            <button onClick={toAbout} className="button">
              Explore More
            </button>
          </div>
        </section>
        <section id={homeCSS.brandsSection}>
          <h1>Choose By Brand</h1>
          <div id={homeCSS.brandsContainer}>
            {brandsData.map((element, index) => (
              <Brandcard name={element.name} src={element.src} key={index} />
            ))}
          </div>
        </section>
        <main>
          <Holder
            name="Category"
            link="/shop"
            items={categories}
            newClass="category"
            content="sex"
          />

          <Holder
            name="Trending"
            link="/shop"
            items={trendingData}
            newClass="others"
            content="brandset"
            mappedDataName="trending"
          />

          <Holder
            name="New Arrival"
            link="/shop"
            items={newArrivalData}
            newClass="others"
            content="brandset"
            mappedDataName="newArrival"
          />
        </main>
        <div className={homeCSS.discount}>
          <h1>Get discount for membership</h1>
          <p>Every new membership will get a 40% discount</p>
          <button onClick={toLogin} className="button">
            Join Now
          </button>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
