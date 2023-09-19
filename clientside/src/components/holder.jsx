import { React, useState } from "react";
import Brandset from "./brandset";
import Sex from "./sex";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import HolderCSS from "./Holder.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Holder(prop) {
  // const [content,setContent] = useState(prop.content);

  return (
    <div className={HolderCSS.holderDiv}>
      <div>
        <h1>{prop.name}</h1>
        <motion.a
          initial={{ x: -10 }}
          animate={{ x: 5 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          href={prop.link}
        >
          ALL PRODUCTS
          <ArrowRightAltIcon />
        </motion.a>
      </div>
      <div className={HolderCSS.secondHolder + " " + HolderCSS[prop.newClass]}>
        {prop.items.map((ctg) => {
          if (prop.content === "sex") {
            return (
              <Sex
                src={ctg.image}
                alt={ctg.name}
                name={ctg.name}
                key={ctg.id}
                id={ctg.id}
                // margin="margin"
              />
            );
          } else if (prop.content === "brandset") {
            return (
              <Brandset
                src={ctg.image}
                alt={ctg.name}
                name={ctg.name}
                key={ctg.id}
                dataSource={prop.mappedDataName}
                id={ctg.id}
                price={ctg.price}
                vendor={ctg.vendor}
                source="home"
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default Holder;
