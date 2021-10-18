import React from 'react'

const ProductCardInCheckOut = ({products})=> 
{
    const {image,title,price,brand,color,count} = products;
    return(<tbody>
        <tr>
            <td>{image}</td>
            <td>{title}</td>
            <td>${price}</td>
            <td>{brand}</td>
            <td>{color}</td>
            <td>{count}</td>
            <td>shipping</td>
            <td>Delete</td>
        </tr>
    </tbody>)
}

export default ProductCardInCheckOut