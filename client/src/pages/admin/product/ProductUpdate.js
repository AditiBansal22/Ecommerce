import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import AdminNav from '../../../components/nav/AdminNav';
import {toast, toastify} from 'react-toastify';
import {useSelector} from 'react-redux';
import {getCategory, getCategories, getCategorySubs} from '../../../functions/category';
import CategoryForm from '../../../components/forms/CategoryForms';
import { getProduct, updateProduct } from "../../../functions/product";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
    title: "",
    description: "",
    price: "",
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    color: "",
    brand: "",
  };

const ProductUpdate = ({match,history}) => {
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => ({...state}));
    const {slug} = match.params;
    const [values,setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [showSub, setShowSub] = useState(false);
    const [categories, setCategories] = useState([]);
    const [arrayOfSubsIds, setArrayOfSubsIds] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        loadProduct();
        loadCategories();
    },[]);
const loadProduct = () => {
    getProduct(slug)
    .then(p=> {
       // console.log("single product",p);
        setValues({...values, ...p.data});
        // load single product category subs
        getCategorySubs(p.data.category._id)
        .then((res) => {
            setSubOptions(res.data);  //show default values
        });
        let arr = [];
        p.data.subs.map((s) =>  arr.push(s._id));
        setArrayOfSubsIds((prev) => arr); //req. for antd Select design to work
    })
}

const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

    const handleSubmit = (e) => {
         e.preventDefault();
          setLoading(true);
         values.subs = arrayOfSubsIds;
         values.category = selectedCategory ? selectedCategory : values.category;
         updateProduct(slug, values, user.token)
         .then((res) => {
            setLoading(false);;
            toast.success(`"${res.data.title}" is updated.`);
            history.push("/admin/products");
         })
         .catch((err) => {
             console.log(err);
             setLoading(false);
             toast.error(err.response.data.err);
         })
    };

    const handleCatagoryChange = (e) => {
        e.preventDefault();
        console.log("CLICKED CATEGORY", e.target.value);
        setValues({ ...values, subs: [] });
        setSelectedCategory(e.target.value);



        getCategorySubs(e.target.value).then((res) => {
          setSubOptions(res.data);
        });
      //  setShowSub(true);
       if(values.category._id === e.target.value)
       {
           loadProduct();
       }
        setArrayOfSubsIds([]);

      };


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log(e.target.name, " ----- ", e.target.value);
      };

    return (
       <div className="container-fluid">
          <div className="row">
               <div className="col-md-2">
                   <AdminNav />
               </div>
            <div className="col-md-10">
            {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product Update</h4>
          )}
          <hr />
            <div className="p-3">
                <FileUpload
                values={values}
                setValues={setValues}
                setLoading={setLoading}
                />
          </div>
          <br />
               {/* {JSON.stringify(values)} */}
               <ProductUpdateForm
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    setValues={setValues}
                    values={values}
                     handleCatagoryChange={handleCatagoryChange}
                     subOptions={subOptions}
                     showSub={showSub}
                     categories ={categories}
                     arrayOfSubsIds = {arrayOfSubsIds}
                     setArrayOfSubsIds ={setArrayOfSubsIds}
                     selectedCategory ={selectedCategory}
                />
            </div>
          </div>
        </div>
        );
    
   
}

export default ProductUpdate