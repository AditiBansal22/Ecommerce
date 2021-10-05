/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import {Link} from 'react-router-dom'


const AdminNav = () => (
    <nav>
    <ul className="nav flex-column">
        <li className="nav-item">
            <Link to="/admin/dashboard" className="nav-link">
                Dashboard
            </Link>
        </li>
        <li className="nav-item" className="nav-link">
            <Link to="/admin/product">
                Password
            </Link>
        </li>
        <li className="nav-item" className="nav-link">
            <Link to="/admin/product">
                Product
            </Link>
        </li>
        <li className="nav-item" className="nav-link">
            <Link to="/admin/products">
                Products
            </Link>
        </li>
        <li className="nav-item" className="nav-link">
            <Link to="/admin/category">
                Category
            </Link>
        </li>
        <li className="nav-item" className="nav-link">
            <Link to="/admin/sub">
                Sub Category
            </Link>
        </li>
        <li className="nav-item" className="nav-link">
            <Link to="/admin/coupon">
               Coupon
            </Link>
        </li>
        <li className="nav-item" className="nav-link">
            <Link to="/user/password">
               Password
            </Link>
        </li>
    </ul>
</nav>
)
export default AdminNav