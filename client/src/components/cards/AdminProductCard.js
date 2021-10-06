import React from 'react'
import {Card} from "antd";
import laptop from "../../images/laptop.jfif"
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
const {Meta} = Card;

const AdminProductCard = ({product}) => {
    const {title, description,images} = product;
    return (
        <Card cover = {<img src={images && images.length ? images[0].url : laptop } style={{height: '150px', objectFit:"Cover"}} className="p-1"/>
        }
        actions ={[<EditOutlined className="text-danger"/>,<DeleteOutlined className="text-danger"/>]}>
        <Meta title={title} description={`${description && description.substring(0, 10)}...`}/>
        </Card>
    )
}

export default AdminProductCard