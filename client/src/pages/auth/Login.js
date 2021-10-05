import React,{useState, useEffect} from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {Button} from 'antd';
import {useDispatch} from 'react-redux';
import { MailOutlined,GoogleOutlined } from "@ant-design/icons";
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import {createOrUpdateUser} from '../../functions/auth'



const Login = ({ history }) =>
{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    let dispatch = useDispatch();
    const provider = new GoogleAuthProvider();
    const {user} =useSelector((state) => ({...state}));
                  
    useEffect(() => {
        if(user && user.token)
        {
           history.push('/');
        }
    },[user,history]);

    const roleBasedRedirect = (res)=> {
        if(res.data.role === 'admin')
        {
            history.push("/admin/dashboard");
        }
        else{
            history.push("/user/history");
        }
    }

    const handleSubmit = async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    try {
                        const signin = await signInWithEmailAndPassword(auth, email, password);
                        const {user} = signin;
                        const idTokenResult = await user.getIdTokenResult();
                        createOrUpdateUser(idTokenResult.token)
                        .then((res) => {
                            dispatch({
                              type: "LOGGED_IN_USER",
                              payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                              },
                            });
                            roleBasedRedirect(res);
                          })
                        .catch(err => console.log(err.text));
                       
                       // history.push("/");
                    }
                    catch (error) {
                        console.log(error);
                        toast.error(error.message);
                        setLoading(false);
                    }
                 }
                
    
    const loginForm = () => <form onSubmit={handleSubmit}>
        <div className = "form-group">
            <input type="email" className="form-control" value={email} 
            onChange={e => setEmail(e.target.value)} className="form-control"
            autoFocus
            />
        </div>
        <div className = "form-group">
            <input type="password" className="form-control" value={password} 
            onChange={e => setPassword(e.target.value)} className="form-control"
            autoFocus
            />
        </div>
        <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
        >
        Login with Email/Password
       </Button>
       
        </form>
     

      const googleLogin = async() =>
      {
          signInWithPopup(auth,provider)
          .then(async (result) => {
              console.dir(result);
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();
            createOrUpdateUser(idTokenResult.token)
            .then(
                (res) => {dispatch(
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
                );
                roleBasedRedirect(res);
            }
            )
            .catch(err => console.log(err.text));
            history.push("/");
            
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });
      }


    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Login</h4>
                    {loginForm()}
                    <Button onClick={googleLogin} type="danger" className="mb-3" icon={<GoogleOutlined />} size="large" > 
                      Google Login
                    </Button>
                    <div>
                     <Link to="/forgot/password" className ="float-right text-danger">Forgot Password</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;