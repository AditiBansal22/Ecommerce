import React from 'react'
import {Card} from "antd";
import laptop from "../../images/laptop.jfif"
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import {Link} from "react-router-dom";

const {Meta} = Card;

const AdminProductCard = ({product, handleRemove}) => {
    const {title, description,images,slug} = product;
    return (
        <Card cover = {<img alt ={title} src={images && images.length ? images[0].url : laptop } style={{height: '150px', objectFit:"Cover"}} className="p-1"/>
        }
        actions ={[<Link to ={`/admin/product/${slug}`}><EditOutlined className="text-danger"/></Link>,<DeleteOutlined className="text-danger" onClick= {() =>handleRemove(slug)}/>]}>
        <Meta title={title} description={`${description && description.substring(0, 10)}...`}/>
        </Card>
    )
}

export default AdminProductCard