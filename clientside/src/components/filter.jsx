import { useEffect } from "react";
import filterCSS from "./filter.module.css";
import { AnimatePresence, motion, spring } from "framer-motion";

function Filter(props) {
  return (
    // <AnimatePresence>
    <motion.div
      initial={{ x: "-100%" }}
      animate={props.filterState ? { x: 1 } : { x: "-100%" }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      ref={props.filterRef}
      className={filterCSS.filter_box}
    >
      <ul className={filterCSS.container_ul}>
        <li>
          <div>
            <h4>Gender</h4>
            <ul>
              <li>
                <input
                  onChange={props.filterFunction}
                  type="checkbox"
                  id="men"
                  name="gender"
                  value="men"
                ></input>
                <label htmlFor="men">Men</label>
              </li>
              <li>
                <input
                  onChange={props.filterFunction}
                  type="checkbox"
                  id="women"
                  name="gender"
                  value="women"
                ></input>
                <label htmlFor="women">Women</label>
              </li>
              <li>
                <input
                  onChange={props.filterFunction}
                  type="checkbox"
                  id="kids"
                  name="gender"
                  value="kids"
                ></input>
                <label htmlFor="kids">Kids</label>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div>
            <h4>Shop by Price</h4>
            <ul>
              <li>
                <input
                  onChange={props.filterFunction}
                  type="checkbox"
                  id="0_25"
                  name="price"
                  value="0_25"
                ></input>
                <label htmlFor="0_25">$0 - $25</label>
              </li>
              <li>
                <input
                  onChange={props.filterFunction}
                  type="checkbox"
                  id="25_50"
                  name="price"
                  value="25_50"
                ></input>
                <label htmlFor="25_50">$25 - $50</label>
              </li>
              <li>
                <input
                  onChange={props.filterFunction}
                  type="checkbox"
                  id="50_100"
                  name="price"
                  value="50_100"
                ></input>
                <label htmlFor="50_100">$50 - $100</label>
              </li>
              <li>
                <input
                  onChange={props.filterFunction}
                  type="checkbox"
                  id="100_150"
                  name="price"
                  value="100_150"
                ></input>
                <label htmlFor="100_150">$100 - $150</label>
              </li>
              <li>
                <input
                  onChange={props.filterFunction}
                  type="checkbox"
                  id="over_150"
                  name="price"
                  value="150"
                ></input>
                <label htmlFor="0_150">over $150</label>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div>
            <h4>Color</h4>
          </div>
          <div className={filterCSS.colors}>
            <div className={filterCSS.blackContainer}>
              <div
                data-name="color"
                data-value="black"
                data-parent=".blackContainer"
                aria-checked="false"
                onClick={props.filterFunction}
                id={filterCSS.black}
                className={filterCSS.color_circle}
              ></div>
              <p className={filterCSS.color_p}>Black</p>
            </div>
            <div className={filterCSS.whiteContainer}>
              <div
                data-name="color"
                data-parent=".whiteContainer"
                data-value="white"
                aria-checked="false"
                onClick={props.filterFunction}
                id={filterCSS.white}
                className={filterCSS.color_circle}
              ></div>
              <p className={filterCSS.color_p}>White</p>
            </div>
            <div className={filterCSS.redContainer}>
              <div
                data-name="color"
                data-parent=".redContainer"
                data-value="red"
                aria-checked="false"
                onClick={props.filterFunction}
                id={filterCSS.red}
                className={filterCSS.color_circle}
              ></div>
              <p className={filterCSS.color_p}>Red</p>
            </div>
            <div className={filterCSS.blueContainer}>
              <div
                data-name="color"
                data-parent=".blueContainer"
                data-value="blue"
                aria-checked="false"
                onClick={props.filterFunction}
                id={filterCSS.blue}
                className={filterCSS.color_circle}
              ></div>
              <p className={filterCSS.color_p}>Blue</p>
            </div>
            <div className={filterCSS.greenContainer}>
              <div
                data-name="color"
                data-parent=".greenContainer"
                data-value="green"
                aria-checked="false"
                onClick={props.filterFunction}
                id={filterCSS.green}
                className={filterCSS.color_circle}
              ></div>
              <p className={filterCSS.color_p}>Green</p>
            </div>
            <div className={filterCSS.yellowContainer}>
              <div
                data-name="color"
                data-parent=".yellowContainer"
                data-value="yellow"
                aria-checked="false"
                onClick={props.filterFunction}
                id={filterCSS.yellow}
                className={filterCSS.color_circle}
              ></div>
              <p className={filterCSS.color_p}>Yellow</p>
            </div>
            <div className={filterCSS.brownContainer}>
              <div
                data-name="color"
                data-parent=".brownContainer"
                data-value="brown"
                aria-checked="false"
                onClick={props.filterFunction}
                id={filterCSS.brown}
                className={filterCSS.color_circle}
              ></div>
              <p className={filterCSS.color_p}>Brown</p>
            </div>
            <div className={filterCSS.greyContainer}>
              <div
                data-name="color"
                data-parent=".greyContainer"
                data-value="grey"
                aria-checked="false"
                onClick={props.filterFunction}
                id={filterCSS.grey}
                className={filterCSS.color_circle}
              ></div>
              <p className={filterCSS.color_p}>Grey</p>
            </div>
            <div className={filterCSS.otherContainer}>
              <div
                data-name="color"
                data-parent=".otherContainer"
                data-value="othercolors"
                aria-checked="false"
                onClick={props.filterFunction}
                id={filterCSS.multicolor}
                className={filterCSS.color_circle}
              ></div>
              <p className={filterCSS.color_p}>Other Colors</p>
            </div>
          </div>
        </li>
        <li>
          <div>
            <div>
              <h4>Brand</h4>
            </div>
            <ul>
              <li>
                <input
                  onChange={props.filterFunction}
                  type="checkbox"
                  id="Nike"
                  name="vendor"
                  value="NIKE"
                ></input>
                <label htmlFor="Nike">Nike</label>
              </li>
              <li>
                <input
                  onChange={props.filterFunction}
                  type="checkbox"
                  id="Adidas"
                  name="vendor"
                  value="ADIDAS"
                ></input>
                <label htmlFor="Adidas">Adidas</label>
              </li>
              <li>
                <input
                  onChange={props.filterFunction}
                  type="checkbox"
                  id="NewBalance"
                  name="vendor"
                  value="NEW BALANCE"
                ></input>
                <label htmlFor="NewBalance">NewBalance</label>
              </li>
              <li>
                <input
                  onChange={props.filterFunction}
                  type="checkbox"
                  id="TimberLand"
                  name="vendor"
                  value="TIMBERLAND"
                ></input>
                <label htmlFor="TimberLand">TimberLand</label>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </motion.div>
    // )}
    // </AnimatePresence>
  );
}

export default Filter;
