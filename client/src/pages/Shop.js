import React,{useState, useEffect} from 'react';
import { getProductsByCount, fetchProductsByFilter } from '../functions/product';
import {useSelector, useDispatch, createSelectorHook} from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import ProductListItems from '../components/cards/ProductListItems';
import {Menu, Slider} from 'antd';
import { DollarOutlined } from '@ant-design/icons';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price,setPrice] =useState([0,0]);
    const [ok,setOk] = useState(false);
    let {search} = useSelector((state) => ({...state}));
    const {text} = search;
    const {SubMenu, ItemGroup} = Menu;
    let dispatch =  useDispatch();

     // load products on pageload by default
    useEffect(() => {
        loadAllProducts();
    },[])

    const fetchProducts = (args) => {
        fetchProductsByFilter(args)
       .then((res) => {
           setProducts(res.data);
       })
    }

    const loadAllProducts = () => {
        getProductsByCount(12).then((p) => {
          setProducts(p.data);
          setLoading(false);
        });
      };

    // based on search query
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({query:text});
        },300);
        
        return () => clearTimeout(delayed);
     
    },[text])

    useEffect(() => {
        console.log("ok to request");
        fetchProducts({ price });
      }, [ok]);

    
 //based in price range


    const handleSlider = (value) => {
        dispatch({
            type:"SEARCH_QUERY",
            payload: {text:""}
        });
        setPrice(value);
        setTimeout(() =>{setOk(!ok)},300);
    }

    return (<div className="container-fluid">
        <div className="row">
            <div className="col-md-3 pt-2">
                <h4>Seach/Filter</h4>
                <hr />
                <Menu defaultOpenKeys={['1','2']} mode="inline">
                    <SubMenu key='1' title={<span className="h6"> <DollarOutlined /> Price</span>} >
                        <div>
                            <Slider className="ml-4 mr-4" tipFormatter = {(v) => `$${v}`} range calue={price} onChange={handleSlider} max ="9999"/>
                        </div>

                    </SubMenu>
                </Menu>
            </div>

            <div className="col-md-9 pt-3">
                {loading ? (
                    <h4 className="text-danger">Loading...</h4>
                ):(<h4 className="text-danger">Products</h4>)}

                {products.length <1 && <p>No products found</p>}
                <div className="row pb-5">
                    {products.map((p) => (<div key={p._id} className="col-md-4 mt-3">
                        <ProductCard product={p} />
                    </div>))}
                </div>
            </div>
        </div>
    </div>)
}
export default Shop