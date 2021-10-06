/* eslint-disable react/jsx-no-duplicate-props */
import React ,{useEffect, useState} from "react";

import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../functions/product";
import {useSelector} from 'react-redux';
import { toast } from "react-toastify";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const {user} = useSelector((state) => ({...state}));
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

    const handleRemove = (slug) => {
        let answer = window.confirm('Delete?');
        if(answer)
        {
            //console.log("Send delete request?",slug);
            removeProduct(slug,user.token)
            .then((res)=>{
              console.log("response",res.data);
              loadAllProducts();
              toast.success(`${res.data.title} is deleted`);
            })
            .catch((err) => {
              console.log(err.message);
              toast.error(err.message);
            })
        }
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
                        <div key={product._id} className="col-md-3 pb-3">
                         <AdminProductCard product ={product} key={product._id} handleRemove = {handleRemove}/>
                        </div>
                        ))}
                    </div>
                 </div>
            </div>   
        </div>
    )
}

export default AllProducts