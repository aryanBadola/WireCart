import React, { Fragment, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../../component/layout/Header";
import {CgMouse} from "react-icons/all";
import "./home.css"
import ProductItem from "./ProductItem";
import MetaData from "../../component/layout/MetaData";
import {clearErrors, getProduct} from "../../actions/productAction";
import {useSelector, useDispatch} from "react-redux";
import Loader from "../../component/layout/Loader/Loader";
import { useAlert } from "react-alert";
import Banner from "../../component/Banner/Banner";





const Home = ()=>{
    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading, error, products} = useSelector(
        (state) => state.products
    )

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProduct());
    },[dispatch,error,alert])
    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
            <MetaData title="Ecommerce" />
            <Banner />
            {/* <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>Scroll <CgMouse /></button>
                </a>
            </div> */}

            <h2 className="homeHeading">Featured Products</h2>

            <div className="container" id="container">
                {products && products.map((product) => <ProductItem product={product} />)}
            </div>
        </Fragment>}
        </Fragment>
       
        
        
    )
}


export default Home;