import {React, useContext} from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { CartContext } from '../cartcontext';
import cartitemCSS from "./cartitem.module.css"

export default function Cartitem(props) {
const {cartItems, saveItems} = useContext(CartContext);

function removeItem(index){
    const newArray = [...cartItems]
    newArray.splice(index,1);
   saveItems(newArray)
};


  return (
    <div className={cartitemCSS.itemContainer}>
        <img className={cartitemCSS.itemImage} src={props.src}  alt="shoe"/>
        <div className={cartitemCSS.info}>
                <div className={cartitemCSS.priceAndEdit}>
                   <h4>{"$" + props.price}</h4> 
                    <div className={cartitemCSS.edit}><EditOutlinedIcon fontSize='small'/> <DeleteOutlineOutlinedIcon fontSize='small' onClick={()=>removeItem(props.itemIndex)}/></div>
                </div>
            <p>{props.name}</p>
            {/* <p>{props.size}</p> */}
            <p className={cartitemCSS.moveToFavorites}>Move to favorites</p>
        </div>
    </div>
  )
}
