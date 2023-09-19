import Diversity1RoundedIcon from "@mui/icons-material/Diversity1Rounded";
import TitleCSS from "./title.module.css";
import { useEffect, useRef, useState } from "react";

function Title(props) {
  const [title, setTitle] = useState("");
  const [index, setIndex] = useState(0);
  const word = props.name;
  useEffect(() => {
    if (index < word.length) {
      const timer = setTimeout(() => {
        setTitle((prevText) => {
          return prevText + word[index];
        });
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [index, word]);

  return (
    <div ref={props.titleRef} className={TitleCSS.container}>
      <div className={TitleCSS.containerTwo}>
        <h1 className={TitleCSS.typingEffect}>
          <Diversity1RoundedIcon /> {title}
        </h1>
        <hr />
        <h4 className={TitleCSS.h4}>ALL ABOUT THE FOOT</h4>
        <hr />
      </div>
    </div>
  );
}

export default Title;
