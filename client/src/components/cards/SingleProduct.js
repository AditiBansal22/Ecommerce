import React,{useState} from 'react';
import {Card, Tabs, Tooltip} from 'antd'
import {Link} from 'react-router-dom'
import {HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Laptop from '../../images/laptop.jfif';
import ProductListItems from './ProductListItems';
import _ from 'lodash';
import { useSelector,useDispatch } from 'react-redux';
import userReducer from '../../reducers/userReducer';


const {Meta} = Card;
const {TabPane} = Tabs;

const SingleProduct = ({product}) => {
    const {title, images, description} = product;
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
           <> 
            <div className ="col-md-7">
                {images && images.length ?(<Carousel showArrows={true} autoPlay infiniteLoop>
                    {images.map((i) => <img  src={i.url} key={i.public_id} /> )}
                </Carousel>) :
                 (<Card cover = {
                            <img src={Laptop }  className="mb-3 card-image" alt="laptop"/>
                            }></Card>)
                
                }
                <Tabs type="card">
                    <TabPane tab="description" key="1">{description && description}</TabPane>
                    <TabPane tab="specification" key="2">Product Specification</TabPane>
                </Tabs>
            </div>

            <div className="col-md-5">
            <h1 className="bg-info p-3">{title}</h1>
                <Card
                    actions ={[
                        <Tooltip title={toolTip}>
                         <div onClick={handleAddToCart}>
                            <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
                         </div>,
                       </Tooltip>,
                        <Link to="/"><HeartOutlined className="" /><br />Add to Wishlist</Link>
                    ]} >
                   
                    <ProductListItems product={product}/>
                </Card>
            </div>
           </>
       )
}

export default SingleProduct