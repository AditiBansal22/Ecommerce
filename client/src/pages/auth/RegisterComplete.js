import React,{useState,useEffect} from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isSignInWithEmailLink, updatePassword,signInWithEmailLink } from "firebase/auth";
import {useSelector,useDispatch} from "react-redux";
import {createOrUpdateUser} from '../../functions/auth'




const RegisterComplete = ({history}) =>
{
    console.log("RegisterComplete");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    //const {user} =useSelector((state) => ({...state}));
    let dispatch = useDispatch();
    //history.pushState();

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));
    }, [password,history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
       
      if(!email || !password)
      {
          toast.error('Email and Password is required');
          return;

      }
    
      if(password.length < 6)
      {
          toast.error('Password should be 6 characters long');
          return;
      }
        try {
            console.log("Submit");

            if(isSignInWithEmailLink(auth,window.location.href))
            {
                let email = window.localStorage.getItem("emailForRegistration"); 
                if(!email)
                {
                    email = window.prompt('Please provide your email for confirmation');
                }
            }

          const result = await signInWithEmailLink(
            auth,
            email,
            window.location.href
          );
             console.log("RESULT", result);
          if (result.user.emailVerified) {
            // remove user email fom local storage
            window.localStorage.removeItem("emailForRegistration");
            // get user id token
            let user = auth.currentUser;
            console.log(user);
            //await user.updatePassword(password);
            
            await updatePassword(user, password);
            const idTokenResult = await user.getIdTokenResult();
            // redux store
            //console.log("user", user, "idTokenResult", idTokenResult);
            // redirect
            createOrUpdateUser(idTokenResult.token)
            .then(
                (res) => dispatch(
                    {
                        type: "LOGGED_IN_USER",
                        payload:{
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            _id: res.data._id
                        }
                    }
                )
            )
            .catch(err => console.log(err.text));
            history.push("/");
          }
        } catch (error) {
          console.log(error.code);
          toast.error(error.message);
        }
      };
    const completeForm = () => <form onSubmit={handleSubmit}>
            <input type="email" className="form-control" value={email} disabled        
            />

            <input type="password" className="form-control" value={password} 
            onChange = {e => setPassword(e.target.value)}
            placeholder = "Password"
            autoFocus
            />
            <br />
            
            {/* <button  className="btn btn-raised" onClick={ (e)=> handleSubmit(e)}>REGISTRATION COMPLETE1</button> */}
            <button type="submit" className="btn btn-raised">REGISTRATION COMPLETE2</button>
        </form>
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    
                    <h4>Registration Complete</h4>
                    {completeForm()}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete;