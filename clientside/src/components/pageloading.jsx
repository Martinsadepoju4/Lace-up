import React from "react";

function Pageloading() {
  return (
    <div className="loading">
      <img
        className=".loadingImage"
        src="images/whiteloading.gif"
        alt="loading..."
      />
      <p>Please check your internet connection or reload the page</p>
    </div>
  );
}

export default Pageloading;
