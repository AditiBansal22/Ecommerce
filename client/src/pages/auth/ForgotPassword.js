import React,{useState,useEffect} from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendPasswordResetEmail  } from "firebase/auth";
import {useSelector} from "react-redux";

const ForgotPassword = ({history}) =>
{
    const[email, setEmail] = useState('');
    const[loading,setLoading] = useState(false);
    const {user} =useSelector((state) => ({...state}));

     useEffect(() => {
         if(user && user.token)
         {
            history.push('/');
         }
     },[user,history])



    const config = {
        url: 'http://localhost:3000/login',
        handleCodeInApp: true,
      };

        const handleSubmit = async(e)=>
        {
            e.preventDefault();
            setLoading(true);
    
        await sendPasswordResetEmail(auth, email,config)
            .then(() =>{
                setEmail('');
                setLoading(false);
                toast.success('Check your email for password reset link');
            })
            .catch((error) => {
                setLoading(false);
                const errorMessage = error.message;
                console.log(errorMessage);
                toast.error(error.message);
                // ..
              });

        }


    return <div className="container col-md-6 offset0md-3 p-5">
       {loading ? (<h4 className="text-danger">Loading</h4>):(<h4>Forgot Password</h4>)}

       <form onSubmit={handleSubmit}>
           <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus></input>
           <br></br>
           <button type="submit" className="btn btn-raised" disabled={!email}>Submit</button>
       </form>
    </div>
}

export default ForgotPassword