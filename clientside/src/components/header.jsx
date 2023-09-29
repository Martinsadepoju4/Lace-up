import { React, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderCSS from "./header.module.css";
import Nav from "./nav";

const classes = [
  {
    index: 0,
    url: "https://wallpaperaccess.com/full/1076768.jpg",
  },
  {
    index: 1,
    url: "https://wallpaperaccess.com/full/1076763.jpg",
  },
  {
    index: 2,
    url: "https://wallpaperaccess.com/full/1306720.jpg",
  },
  {
    index: 3,
    url: "https://wallpaperaccess.com/full/1076764.jpg",
  },
  {
    index: 4,
    url: "https://wallpaperaccess.com/full/1076767.jpg",
  },
];

function Header(props) {
  const [index, setIndex] = useState(0);
  const [id, setId] = useState(null);
  const header = useRef(null);
  const circles = useRef([]);
  const arr = [0, 1, 2, 3, 4];
  const navigate = useNavigate();
  useEffect(() => {
    const n = Math.floor(Math.random() * 5);
    deleteExistingClass();
    header.current.style.backgroundImage = "url(" + classes[n].url + ")";
    addNewClass(n);
  }, []);
  const toShop = () => {
    navigate("/shop");
  };

  function deleteExistingClass() {
    circles.current.forEach((element) => {
      if (element.classList.contains(HeaderCSS["active"])) {
        element.classList.remove(HeaderCSS["active"]);
      }
    });
  }
  function addNewClass(n) {
    circles.current[n].classList.add(HeaderCSS["active"]);
  }
  function changeImage(event) {
    clearInterval(id);
    var circleClicked = event.target;
    switch (circleClicked) {
      case circles.current[0]:
        header.current.style.backgroundImage = "url(" + classes[0].url + ")";
        deleteExistingClass();
        addNewClass(0);
        break;
      case circles.current[1]:
        header.current.style.backgroundImage = "url(" + classes[1].url + ")";
        deleteExistingClass();
        addNewClass(1);

        break;
      case circles.current[2]:
        header.current.style.backgroundImage = "url(" + classes[2].url + ")";
        deleteExistingClass();
        addNewClass(2);
        break;
      case circles.current[3]:
        header.current.style.backgroundImage = "url(" + classes[3].url + ")";
        deleteExistingClass();
        addNewClass(3);
        break;
      case circles.current[4]:
        header.current.style.backgroundImage = "url(" + classes[4].url + ")";
        deleteExistingClass();
        addNewClass(4);
        break;
      default:
        console.log(circleClicked);
        break;
    }
  }

  return (
    <header ref={header} className={HeaderCSS.head}>
      <Nav linkcolor="white" clsWidth="smallCls" searchIconDisplay="show" />
      <div className={HeaderCSS.headerBox}>
        <h1>Step into the future of style with sneakers that redefine cool.</h1>
        <button onClick={toShop} className="button">
          Explore More
        </button>
        <div className={HeaderCSS.circles}>
          {arr.map((element, index) => {
            return (
              <div
                key={index}
                ref={(element) => {
                  circles.current[index] = element;
                }}
                className={HeaderCSS.circle}
                onClick={changeImage}
              ></div>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default Header;
// const [count,updateCount] = useState(0)
//  const intervalId = useRef(null);
