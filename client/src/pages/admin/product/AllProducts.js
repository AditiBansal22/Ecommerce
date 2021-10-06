/* eslint-disable react/jsx-no-duplicate-props */
import React ,{useEffect, useState} from "react";
//import {Link} from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() =>
      {
        loadAllProducts()
      },[]);

  const loadAllProducts = () => {
    getProductsByCount(100)
    .then((res) => {
      setLoading(false);
      setProducts(res.data);})
    .catch(err => {
      setLoading(false);
      console.log(err)});
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                 <div className="col">
                    {loading ? (<h4>Loading ...</h4>): (<h4>All Products</h4>)}
                    <div className="row">{products.map(product => (
                        <div key={product._id} className="col-md-4">
                         <AdminProductCard product ={product} key={product._id} />
                        </div>
                        ))}
                    </div>
                 </div>
            </div>   
        </div>
    )
}

export default AllProducts