import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import AdminNav from '../../../components/nav/AdminNav';
import {toast, toastify} from 'react-toastify';
import {useSelector} from 'react-redux';
import {createCategory, getCategories, removeCategory} from '../../../functions/category';
import {createSub, removeSub, getSub, updateSub} from '../../../functions/sub';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForms';
import LocalSearch from '../../../components/forms/LocalSearch';

const SubUpdate = ({history,match}) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
     const {user} = useSelector((state) => ({...state}));
     const[categories, setCategories] = useState([]);
     const[parent, setParent] = useState("");
     //searching/filtering
     const[keyword,setKeyword] = useState("");

     useEffect(()=>{
        loadCategories();
        loadSub();
     },[]);

     const loadCategories = () =>getCategories()
     .then( c=> {
         console.log(c.data);
         setCategories(c.data)});

     const loadSub = () =>getSub(match.params.slug)
      .then( c=> {
      console.log(c.data);
      setName(c.data.name);
      setParent(c.data.parent);
      })
      .catch((err) => {console.log("---Load Subs ---"+err);});     

    const handleSubmit = async(e) => {
         e.preventDefault();
         setLoading(true);
         console.log(name);
         updateSub(match.params.slug,{ name, parent}, user.token)
         .then(async(res) => {
           console.log(res)
           setLoading(false);
           setName("");
           toast.success(`"${res.data.name}" is updated`);
           history.pushState('/admin/dub');
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
                {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Create Sub Category</h4>}

                <div className="form-group">
                  <label>Parent Category</label>
                  <select name="category" className="form-control" onChange={e => setParent(e.target.value)}>
                    <option>Please select</option>
                    {categories.length >0 && categories.map((c) => (<option key={c._id} value={c._id} selected={c._id === parent}>{c.name}</option> ))}
                  </select>
                </div>
                {<CategoryForm  handleSubmit = {handleSubmit} name ={name} setName ={setName}/>}
                <div mt-4 pt-5>
                {<LocalSearch keyword={keyword} setKeyword={setKeyword}/>}
                </div>
                <hr />
                {/*searched*/}
               
            </div>
          </div>
        </div>
        );
    
   
}

export default SubUpdate;