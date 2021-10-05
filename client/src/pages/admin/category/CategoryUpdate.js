import React, {useState, useEffect, } from "react";
import AdminNav from '../../../components/nav/AdminNav'
import {toast, toastify} from 'react-toastify';
import {useSelector} from 'react-redux';
import {getCategory,updateCategory} from '../../../functions/category';
import CategoryForm from '../../../components/forms/CategoryForms';

//import {useParams} from "react-router-dom";
//import {EditOutlined,DeleteOutlined} from '@ant-design/icons'

const CategoryUpdate = ({history, match}) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => ({...state}));
    // {slug} = useParams()

     useEffect(()=>{
         //console.log(match);
         //console.log(slug);
        loadCategory();
     },[]);

     const loadCategory = () =>getCategory(match.params.slug)
     .then( c=> {
          setName(c.data.name);
     })
     .catch(err => {console.log(err.message)});

    const handleSubmit = (e) => {
         e.preventDefault();
         setLoading(true);
         console.log(name);
         updateCategory(match.params.slug,{ name },user.token)
         .then((res) => {
           // console.log(res)
           setLoading(false);
           setName("");
           toast.success(`"${res.data.name}" is updated`);
           history.push('/admin/category');
          // loadCategories();
         })
         .catch((err) => {
           console.log(err.response);
           setLoading(false);
           if (err.status === 400) toast.error(err.response);
         });
    };
    
    return (
        <div className="container-fluid">
      <div className="row">
           <div className="col-md-2">
               <AdminNav />
           </div>
        <div className="col">
            {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Update Category</h4>}
            {<CategoryForm  handleSubmit = {handleSubmit} name ={name} setName ={setName}/>}
            <hr></hr>
        </div>
      </div>
    </div>
    )
}

export default CategoryUpdate