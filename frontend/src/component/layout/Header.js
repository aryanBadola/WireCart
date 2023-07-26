import React from "react";
import {ReactNavbar} from "overlay-navbar";
import logo from "../../images/logo.jpg";
import {FaUserAlt} from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import Product from "../../pages/Products/Products";
import Contact from "../../pages/Contact";
import Home from "../../pages/Home/Home";
import About from "../../pages/About";



  
  const Header = () => {
    return (
      <div>
        <nav>
          <ul>
            <li> <NavLink to="/">Home</NavLink> </li>
            <li> <NavLink to="/product">Product</NavLink> </li>
            <li> <NavLink to="/contact">Contact</NavLink> </li>
            <li> <NavLink to="/about">About</NavLink> </li>
          </ul>
        </nav>
      </div>
  
    );
  }
  

export default Header;