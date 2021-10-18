import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import ProductCardInCheckOut from '../components/cards/ProductCardInCheckOut'

const Cart = () => {
    const {user,cart} = useSelector((state) =>({...state}));
    const getTotal = () =>{
        return cart.reduce((currentValue, nextValue) =>{
            return currentValue + nextValue.count * nextValue.price
        } ,0);
    }

    const saveOrderToDb = () =>{
        return cart.reduce((currentValue, nextValue) =>{
            return currentValue + nextValue.count * nextValue.price
        } ,0);
    }

    const showCartItems = () => (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                    <th scope="col">Remove</th>
                </tr>
            </thead>
            {cart.map ((p) => <ProductCardInCheckOut key={p._id} products={p} />)}
        </table>
    )
    return(
        <div className="container-fluid pt-2">
        <div className="row">
             <div className="col-md-8">
                  <h4>Cart /{cart.length} Products</h4>
                 {!cart.length ? <p>No products in cart. <Link to="/shop">Continue shopping.</Link></p> :(showCartItems())}
             </div>
            <div className="col-md-4"><h4>Order Summary</h4>
                <hr/>
                <p>Products</p>
                {cart.map((c,i) => (<div key={i}>
                    <p>{c.title} X {c.count} = ${c.price * c.count}</p>
                </div>))}
                <hr />
                Total: <b>${getTotal()}</b>
                <hr/>
                {user ? (
                    <button onClick={saveOrderToDb} className="btn btn-sm btn-primary mt-2" disbaled={!cart.length}>Proceed to Checkout</button>
                ) :(
                    <Link to={{
                        pathname:"login",
                        state: {from: "cart"}   //state of route
                    }}>Login to Checkout</Link>
                )}
            </div>
        </div>
    </div>
    )
 
}

export default Cart;