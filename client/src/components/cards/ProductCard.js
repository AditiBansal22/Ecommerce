import React,{useState} from 'react';
import {Card, Tooltip} from "antd";
import laptop from "../../images/laptop.jfif"
import {EyeOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import {Link} from "react-router-dom";
import _ from 'lodash';
import { useSelector,useDispatch } from 'react-redux';
import userReducer from '../../reducers/userReducer';


const {Meta} = Card;

const ProductCard = ({product}) => {
    const {title, description,images,slug,price} = product;
    const [toolTip,setTooltip] = useState('click to add');
    const {user,cart} = useSelector((state) =>({...state}));
    const dispatch = useDispatch();

    const handleAddToCart =() => {
      //showtooltip
         //create cart array
      let cart =[];
      if(typeof window !== 'undefined')
      {
        //if cart is in localstorage GET it
        if(localStorage.getItem('cart')){
          cart = JSON.parse(localStorage.getItem('cart'));
        }
        // push new product to cart
        cart.push({
          ...product,
          count:1
        });
        //remove duplicates
        let unique = _.uniqWith(cart, _.isEqual);
        //save to localstorage
        localStorage.setItem('cart',JSON.stringify(unique));
        setTooltip('Added');
        dispatch({
          type:"ADD_TO_CART",
          payload:unique
        })
      }
    }
    return (
        <Card cover = {
        <img src={images && images.length ? images[0].url : laptop } style={{height: '150px', objectFit:"Cover"}} className="p-1" alt="image1"/>
        }
        actions={[
            <Link to={`/product/${slug}`}>
              <EyeOutlined className="text-warning" /> <br /> View Product
            </Link>,
            <Tooltip title={toolTip}>
                 <div onClick={handleAddToCart}>
                  <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
                </div>,
            </Tooltip>
           
          ]}
       >
        <Meta title={`${title} - $${price}`} description={`${description && description.substring(0, 10)}...`}/>
        </Card>
        
    )
}

export default ProductCard