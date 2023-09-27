import React from "react";
import { useRef } from "react";
import Lottie from "lottie-react";
import LoadingAnimation from "../images/lottieflow-loading-08-000000-easey.json";
import { useEffect } from "react";

function Pageloading() {
  return (
    <div className="loading">
      <div className="loadingImage">
        <Lottie
          style={{ width: 150, height: 150 }}
          loop={true}
          animationData={LoadingAnimation}
        />
      </div>
      <p>
        If loading persists, kindly check your internet connection and reload
        the page
      </p>
    </div>
  );
}

export default Pageloading;
