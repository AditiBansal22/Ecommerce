import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import AdminNav from '../../../components/nav/AdminNav';
import {toast, toastify} from 'react-toastify';
import {useSelector} from 'react-redux';
import {createCategory, getCategories, removeCategory} from '../../../functions/category';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForms';
import LocalSearch from '../../../components/forms/LocalSearch';

const CategoryCreate = () => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => ({...state}));
    const[categories, setCategories] = useState([]);
     //searching/filtering
    const[keyword,setKeyword] = useState("");

     useEffect(()=>{
        loadCategories();
     },[]);

     const loadCategories = () =>getCategories()
     .then( c=> {
         console.log(c.data);
         setCategories(c.data)});

    const handleSubmit = (e) => {
         e.preventDefault();
         setLoading(true);
         console.log(name);
         createCategory({ name }, user.token)
         .then(async(res) => {
           // console.log(res)
           setLoading(false);
           setName("");
           toast.success(`"${res.data.name}" is created`);
           await loadCategories();
         })
         .catch((err) => {
           console.log(err.response);
           setLoading(false);
           if (err.status === 400) toast.error(err.response);
         });
    };

   
        
    
    const handleRemove = async(slug) => {
        console.log(slug);
        //let answer = window.confirm("Delete?");
        if(window.confirm("Delete?"))
        {
            setLoading(true);
            removeCategory(slug, user.token)
            .then(res => {
                setLoading(false);
                toast.success(`"${res.data.name}"  is deleted.`);
               // loadCategories();
            })
            .catch((error) => {
                setLoading(false);
                console.log(error.message);
            });
        }
    }

    const searched = (keyword) => (c)=>c.name.toLowerCase().includes(keyword);
            return (
            <div className="container-fluid">
          <div className="row">
               <div className="col-md-2">
                   <AdminNav />
               </div>
            <div className="col">
                {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Create Category</h4>}
                {<CategoryForm  handleSubmit = {handleSubmit} name ={name} setName ={setName}/>}
                <div mt-4 pt-5>
                {<LocalSearch keyword={keyword} setKeyword={setKeyword}/>}
                </div>
                <hr />
                {/*searched*/}
                {categories.filter(searched(keyword)).map((c) => (
                    <div className="alert alert-primary " key={c.id}>
                        {c.name} {" "} <span className="btn btn-sm pull-right" onClick ={() => handleRemove(c.slug)}> <DeleteOutlined className="text-danger"/></span>
                        <span className="btn btn-sm float-right"> 
                            <Link to={`/admin/category/${c.slug}`}><EditOutlined className="text-warning"/></Link>
                        </span>
                        </div>
                    )
                )}
            </div>
          </div>
        </div>
        );
    
   
}

export default CategoryCreate