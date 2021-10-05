import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import AdminNav from '../../../components/nav/AdminNav';
import {toast, toastify} from 'react-toastify';
import {useSelector} from 'react-redux';
import {createCategory, getCategories, removeCategory} from '../../../functions/category';
import {createSub, removeSub, getSubs} from '../../../functions/sub';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForms';
import LocalSearch from '../../../components/forms/LocalSearch';

const SubCreate = () => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
     const {user} = useSelector((state) => ({...state}));
     const[categories, setCategories] = useState([]);
     const[subs, setSubs] = useState([]);
     const [category, setCategory] = useState("");
     //searching/filtering
     const[keyword,setKeyword] = useState("");

     useEffect(()=>{
        loadCategories();
        loadSubs();
     },[]);

     const loadCategories = () =>getCategories()
     .then( c=> {
         console.log(c.data);
         setCategories(c.data)});

     const loadSubs = () =>getSubs()
      .then( c=> {
      console.log(c.data);
      setSubs(c.data)})
      .catch((err) => {console.log("---Load Subs ---"+err);});     

    const handleSubmit = async(e) => {
         e.preventDefault();
         setLoading(true);
         console.log(name);
         createSub({ name, parent: category}, user.token)
         .then(async(res) => {
           console.log(res)
           setLoading(false);
           setName("");
           toast.success(`"${res.data.name}" is created`);
           loadSubs();
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
            removeSub(slug, user.token)
            .then(res => {
                setLoading(false);
                toast.success(`"${res.data.name}"  is deleted.`);
                loadSubs();
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
                {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Create Sub Category</h4>}

                <div className="form-group">
                  <label>Parent Category</label>
                  <select name="category" className="form-control" onChange={e => setCategory(e.target.value)}>
                    <option>Please select</option>
                    {categories.length >0 && categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option> ))}
                    {JSON.stringify(category)}
                  </select>
                </div>
                {<CategoryForm  handleSubmit = {handleSubmit} name ={name} setName ={setName}/>}
                <div mt-4 pt-5>
                {<LocalSearch keyword={keyword} setKeyword={setKeyword}/>}
                </div>
                <hr />
                {/*searched*/}
                { subs.filter(searched(keyword)).map((s) => (
                    <div className="alert alert-primary " key={s.id}>
                        {s.name} {" "} <span className="btn btn-sm pull-right" onClick ={() => handleRemove(s.slug)}> <DeleteOutlined className="text-danger"/></span>
                        <span className="btn btn-sm float-right"> 
                            <Link to={`/admin/sub/${s.slug}`}><EditOutlined className="text-warning"/></Link>
                        </span>
                        </div>
                    )
                )}  
            </div>
          </div>
        </div>
        );
    
   
}

export default SubCreate;