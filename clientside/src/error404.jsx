import React from 'react'
import Nav from './components/nav'
import errorCSS from "./css/error404.module.css"
import { useNavigate } from 'react-router-dom'
export default function Error404() {
  const navigate = useNavigate("/")
function toHome(){
  navigate("/")
}

  return (
    <div className={errorCSS.page}>
      <Nav linkcolor="black" clsWidth="smallCls" searchIconDisplay="show" />
       <div className={errorCSS.main}>
        <div>
            <h3>Ooops! <br/> Page Not Found</h3>
            <p>This page doesn't exist or was removed! <br/> We suggest you back to home</p>
            <button onClick={toHome} className='checkoutButton'>Home</button>
        </div>
        <img className={errorCSS.error404Image} src='https://4kwallpapers.com/images/wallpapers/404-error-404-not-3840x2160-9410.jpg' alt='error-404'/>
    </div>  
    </div>
   
  )
}
