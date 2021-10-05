import React, {useState} from "react";
import UserNav from "../../components/nav/UserNav";
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import { updateCurrentUser } from "@firebase/auth";
import { updatePassword  } from "firebase/auth";

const Password = () => {
    const[password,setPassword] = useState("");
    const[loading,setLoading] = useState(false);

    const handleSubmit = async(e) => {
      e.preventDefault();
      setLoading(true);
      const user = auth.currentUser;
     // const newPassword = getASecureRandomPassword()
       await updatePassword(user,password)
       .then(() => {
         console.log(password);
         setLoading(false);
         setPassword("");
         toast.success("Password updated successfully");
        })
       .catch(err => {
         toast.error(err.message);
         setLoading(false);
        }
      )
    }

    const PasswordUpdateForm = () => <form onSubmit={handleSubmit}>
      <div className="form-group">
           <label>Your Password</label>
           <div>
              <input type="password" onChange={e => setPassword(e.target.value)} className="form-group" disabled={loading} value={password}></input>
              <button className="btn btn-primary" disabled={!password || password.length < 6 || loading}>Submit</button>
           </div>
      </div>
    </form>
    return (<div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <UserNav />
      </div>
      <div className="col">
        {loading ? <h4 className="text-danger">Loading</h4> : <h4>Password Update</h4>}
        {PasswordUpdateForm()}
      </div>
    </div>
  </div>
  );
}
 

export default Password;