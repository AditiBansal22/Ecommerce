import React from 'react'
import {Card} from "antd";
import laptop from "../../images/laptop.jfif"
import {EyeOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import {Link} from "react-router-dom";

const {Meta} = Card;

const ProductCard = ({product}) => {
    const {title, description,images,slug} = product;
    return (
        <Card cover = {
        <img src={images && images.length ? images[0].url : laptop } style={{height: '150px', objectFit:"Cover"}} className="p-1"/>
        }
        actions ={[<Link to ={`/product/${slug}`}><EyeOutlined className="text-danger"/><br/>View Product</Link>,
        <>
            <ShoppingCartOutlined className="text-danger" /> <br />Add to Cart
        </>    ]}>
        <Meta title={title} description={`${description && description.substring(0, 10)}...`}/>
        </Card>
        
    )
}

export default ProductCard