import React, {useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import Login from './pages/auth/Login';
import Header from './components/nav/Header';
import {ToastContainer } from 'react-toastify';
import {auth} from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {useDispatch} from 'react-redux';
import ForgotPassword from './pages/auth/ForgotPassword';
import 'react-toastify/dist/ReactToastify.css';
import { currentUser } from './functions/auth';
import History from './pages/user/History';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';



const App = () => {
const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,async(user) =>
      {
       if(user)
       {
        console.log(user);
        const idTokenResult = await user.getIdTokenResult();
        console.log("USER",user);
        currentUser(idTokenResult.token)
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
        })
        .catch((err) => console.log(err));
       }
      }
    );

     return() => unsubscribe();
  },[dispatch]);

  return (
    <>
    <Header />
    <ToastContainer />
    <Switch>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/register/complete" component={RegisterComplete}/>
      <Route exact path="/forgot/password" component={ForgotPassword}/>
      <UserRoute exact path="/user/history" component={History}/>
      <UserRoute exact path="/user/password" component={Password} />
       <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path = "/admin/dashboard" component={AdminDashboard} /> 
        <AdminRoute exact path = "/admin/category" component={CategoryCreate} />
        <AdminRoute exact path = "/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path = "/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path = "/admin/product" component={ProductCreate} />
       <Route path="/"  component={Home}/>
    </Switch>
    </>
  )
}

export default App;
