import React from "react";
import { useRef } from "react";
import Lottie from "react-lottie";
import LoadingAnimation from "../images/lottieflow-loading-08-000000-easey.json";
import { useEffect } from "react";

function Pageloading() {
  return (
    <div className="loading">
      <div className="loadingImage">
        <Lottie
          style={{ width: 200, height: 200 }}
          loop={true}
          animationData={LoadingAnimation}
        />
      </div>
      <p>Please check your internet connection or reload the page</p>
    </div>
  );
}

export default Pageloading;
