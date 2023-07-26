import React, { Fragment } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../component/layout/Header";
import "./search.css";
import MetaData from "../../component/layout/MetaData";

const Search = ({})=>{

  const history = useNavigate();

  const [keyword, setKeyword] = useState("");

 

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if(keyword.trim()){
       history(`/products/${keyword}`) ;
    }
    else{
       history("/");
    }
  }

    return (
       <Fragment>
       <MetaData title="Search a Product --- Ecommerce"/>
        <form className="searchBox" onSubmit={searchSubmitHandler}>
          <input 
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
           />
          <input type="submit" value="Search" />
        </form>
       </Fragment>
    )
}

export default Search;
