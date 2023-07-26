import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../component/layout/Header";
import { NavLink } from "react-router-dom";
import './navbar.css'


const Navbar = ()=>{
    return (
    <nav className="navbar navbar-expand-lg navbar-mainbg">
        <NavLink className="navbar-brand navbar-logo ecommerce" to="/"><i class="fa-sharp fa-solid fa-dumpster-fire"></i>Ecommerce</NavLink>

        <button className="navbar-toggler" type="button"
        data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"><i className="fas fa-bars text-white"></i></button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
                <div className="hori-selector">
                    <div className="left"></div>
                    <div className="right"></div>
                </div>

                <li className="nav-item active">
                    <NavLink className="nav-link" to="/"><i class="fa-solid fa-house"></i>Home</NavLink>
                </li>

                <li className="nav-item active">
                    <NavLink className="nav-link" to="/products"><i class="fa-brands fa-product-hunt"></i>Product</NavLink>
                </li>

                <li className="nav-item active">
                    <NavLink className="nav-link" to="/contact"><i class="fa-solid fa-address-book"></i>Contact</NavLink>
                </li>

                <li className="nav-item active">
                    <NavLink className="nav-link" to="/about"><i class="fa-solid fa-eject"></i> About</NavLink>
                </li>

                <li className="nav-item active">
                    <NavLink className="nav-link" to="/search"><i class="fa-solid fa-magnifying-glass"></i></NavLink>
                </li>

                <li className="nav-item active">
                    <NavLink className="nav-link" to="/cart"><i class="fa-solid fa-cart-shopping"></i></NavLink>
                </li>

                <li className="nav-item active">
                    <NavLink className="nav-link" to="/login"> <i class="fa-solid fa-user"></i></NavLink>
                </li>

            </ul>
        </div>
        
    </nav>)
}

export default Navbar;