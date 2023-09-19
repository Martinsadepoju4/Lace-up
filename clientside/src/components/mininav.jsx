import React from "react";
import mininavCSS from "./mininav.module.css";
import { Link } from "react-router-dom";
export default function MiniNav(props) {
  return (
    <ul className={mininavCSS.miniNav}>
      {props.list.map((element, index) => {
        if (index === 0) {
            return <li key={index} className={mininavCSS.listItemWithoutPreSlash }> 
            <Link to={element.link}> {element.text}</Link>
            </li>
        } else if(index === props.list.length - 1){
         if(props.title){
            return <li key={index} className={mininavCSS.listItemWithPreSlash}> 
            <p>/</p>
            <Link to={element.link} className={mininavCSS.title}> {props.title}</Link>
            </li> 
         }else{
            return  <li key={index} className={mininavCSS.listItemWithPreSlash}> 
            <p>/</p>
            <Link to={element.link}> All</Link>
            </li> 
         }
            }else {
                return <li key={index} className={mininavCSS.listItemWithPreSlash}> 
            <p>/</p>
            <Link to={element.link}> {element.text}</Link>
            </li>  
            }
            
      })}
    </ul>
  );
}
