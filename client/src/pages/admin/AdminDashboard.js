/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import {Link} from "react-router-dom";
import AdminNav from '../../components/nav/AdminNav'

const AdminDashboard = () => {
    return (
        <div className="container-fluid">
      <div className="row">
           <div className="col-md-2">
               <AdminNav />
           </div>
        <div className="col">Admin Dashboard</div>
      </div>
    </div>
    )
}

export default AdminDashboard