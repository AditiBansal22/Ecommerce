import React,{useState, useEffect} from 'react';
import { getProductsByCount, fetchProductsByFilter } from '../functions/product';
import {useSelector, useDispatch, createSelectorHook} from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import ProductListItems from '../components/cards/ProductListItems';
import {Menu, Slider,Checkbox, Radio} from 'antd';
import { DollarOutlined,DownSquareOutlined } from '@ant-design/icons';
import {getCategories} from '../functions/category'
import { getSubs } from '../functions/sub';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price,setPrice] =useState([0,0]);
    const [ok,setOk] = useState(false);
    //to show all categories option
    const [categories,setCategories] = useState([]);
    //to show the selected categories
    const [categoryIds,setCategoryIds] = useState([]);
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState('');
    const [brands, setBrands] = useState(["Apple", "Lenovo","Samsung","Microsoft","ASUS"]);
    const [brand, setBrand] = useState('');
    const [colors, setColors] = useState(["Black", "Brown","White","Blue"]);
    const [color, setColor] = useState('');
    const [shipping, setShipping] = useState('');
    let {search} = useSelector((state) => ({...state}));
    const {text} = search;
    const {SubMenu, ItemGroup} = Menu;
    let dispatch =  useDispatch();

     // load products on pageload by default
    useEffect(() => {
        loadAllProducts();
        //fetch categories
        getCategories().then((res) => setCategories(res.data));

        //fetch subs
        getSubs().then((res) => setSubs(res.data));
    },[])

    const fetchProducts = (args) => {
        console.log(args);
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
        //To clear category
       // setCategoryIds([]);
        setTimeout(() =>{setOk(!ok)},300);
    }

    //based on categories
    const showCategories = () => categories.map((c) => <div key={c._id}>
                                          <Checkbox className="pb-2 pl-4 pr-4" value={c._id} name="category" onChange={handleCheck} checked={categoryIds.includes(c._id)}>{c.name}</Checkbox>
                                          <br />
                              </div>)


const showSubs = () =>subs.map((s) => (  <div
                                        key={s._id}
                                        onClick={() => handleSub(s)}
                                        className="p-1 m-1 badge badge-outlined-secondary"
                                        style={{ cursor: "pointer", color:"black" }}
                                    >
                                        {s.name}
                                    </div>
                                    ));

    const handleSub = s => {
        console.log("SUB", s);
        setSub(s);
        dispatch({
            type:"SEARCH_QUERY",
            payload: {text:""}
        });
        setPrice([0,0]);
        fetchProducts({sub})
    }

    const showBrands =() => brands.map(b => <div><Radio value={b} name={b} checked={b === brand} onChange ={handleBrand}>{b}</Radio></div>)

    const handleBrand = (e) => {
        //console.log(e.target.value);
        // dispatch({
        //     type:"SEARCH_QUERY",
        //     payload: {text:""}
        // });
        // setPrice([0,0]);
        setBrand(e.target.value);
        fetchProducts({brand: e.target.value});
    }
    const handleCheck = (e) =>
    {
        //console.log(e.target.value);
        // dispatch({
        //     type:"SEARCH_QUERY",
        //     payload: {text:""}
        // });
        // setPrice([0,0]);
        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked) === -1 ? inTheState.push(justChecked) : inTheState.splice(inTheState.indexOf(justChecked),1);

        setCategoryIds(inTheState);
        //console.log(inTheState);
        fetchProducts({category: inTheState});
    }

    const showColors = () => colors.map(c => <div><Radio value={c} name={c} checked={c === color} onChange ={handleColors}>{c}</Radio></div>)
     const handleColors =(e) => {
                 //console.log(e.target.value);
        // dispatch({
        //     type:"SEARCH_QUERY",
        //     payload: {text:""}
        // });
        // setPrice([0,0]);
        setColor(e.target.value);
        fetchProducts({color: e.target.value});
     }

     const showShipping = () => (
                 <>
                <Checkbox className="pb-2 pl-4 pr-4" onChange={handleShippingchange} value="Yes" checked={shipping === "Yes"}>Yes</Checkbox>
                <Checkbox className="pb-2 pl-4 pr-4" onChange={handleShippingchange} value="No" checked={shipping === "No"}>No</Checkbox>
                </>
                )

     const handleShippingchange = (e) => {
 //console.log(e.target.value);
        dispatch({
            type:"SEARCH_QUERY",
            payload: {text:""}
        });
        setPrice([0,0]);
        setCategoryIds([]);
        setSub('');
        setBrand('');
        setColor('');
        console.log("HandleShipping: "+e.target.value);
        setShipping(e.target.value);
        fetchProducts({shipping: e.target.value});
     }


    
    return (<div className="container-fluid">
        <div className="row">
            <div className="col-md-3 pt-2">
                <h4>Seach/Filter</h4>
                <hr />
                <Menu defaultOpenKeys={['1','2','3','4','5','6']} mode="inline">
                    <SubMenu key='1' title={<span className="h6"> <DollarOutlined /> Price</span>} >
                        <div>
                            <Slider className="ml-4 mr-4" tipFormatter = {(v) => `$${v}`} range calue={price} onChange={handleSlider} max ="9999"/>
                        </div>
                    </SubMenu>
                    <SubMenu key='2' title={<span className="h6"> <DownSquareOutlined />Categories</span>} >
                        <div style={{marginTop:"-10px"}}>
                            {showCategories()}
                        </div>
                    </SubMenu>
                    {/*subcategories*/}
                    <SubMenu key='3' title={<span className="h6"> Sub Categories</span>} >
                        <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                            {showSubs()}
                        </div>
                    </SubMenu>
                     {/*brands*/}
                     <SubMenu key='4' title={<span className="h6"> Brands</span>} >
                        <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                            {showBrands()}
                        </div>
                    </SubMenu>
                      {/*colors*/}
                      <SubMenu key='5' title={<span className="h6"> Colors</span>} >
                        <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                            {showColors()}
                        </div>
                    </SubMenu>
                     {/*shipping*/}
                     <SubMenu key='6' title={<span className="h6"> <DownSquareOutlined />Shipping</span>} >
                        <div style={{marginTop:"-10px"}}>
                            {showShipping()}
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