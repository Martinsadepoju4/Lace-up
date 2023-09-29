import React from "react";
import Nav from "./components/nav";
import Footer from "./components/footer";
import aboutCSS from "./css/about.module.css";
import Title from "./components/title";
import Staffcard from "./components/staffcard";
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { staffs } from "./data/shopdata";
import "leaflet/dist/leaflet.css";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

function About() {
  Leaflet.Icon.Default.imagePath = "../node_modules/leaflet";

  delete Leaflet.Icon.Default.prototype._getIconUrl;

  Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  return (
    <div>
      <header>
        <Nav linkcolor="black" clsWidth="smallCls" searchIconDisplay="show" />
        <Title name="ABOUT US" />
      </header>
      <main className={aboutCSS.main}>
        <section className={aboutCSS.staffs}>
          <h6 className={aboutCSS.tag}>STAFF</h6>
          <div className={aboutCSS.staffHolder}>
            {staffs.map((staff, index) => {
              return (
                <Staffcard
                  imageUrl={staff.image}
                  name={staff.name}
                  bio={staff.bio}
                  skills={staff.skills}
                  key={index}
                />
              );
            })}
          </div>
        </section>
        <section>
          <h6 className={aboutCSS.tag}>ABOUT</h6>
          <article className={aboutCSS.about}>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea nostrud exercitation ullamco luame dotrmert
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea nostrud exercitation ullamco luame dotrmert
            </p>
            <hr className={aboutCSS.aboutHr} />
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea nostrud exercitation ullamco luame dotrmert
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea nostrud exercitation ullamco luame dotrmert
            </p>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default About;
