import React from "react";
import appstore from "../../../images/Appstore.png"
import playstore from "../../../images/playstore.png"
import "./footer.css"

const Footer = () => {
    return (
      <footer id="footer">
        <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Dowload App for Android and IOS mobile phone</p>
            <img src={playstore} alt="Playstore" />
            <img src={appstore} alt="Appstore" />
        </div>

        <div className="midFooter">
            <h1>Ecommerce</h1>
            <p>High quality is our first priority</p>

            <p>Copyright 2023 &copy; AryanBadola</p>
        </div>

        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="#">Instagram</a>
            <a href="#">Youtube</a>
            <a href="#">Facebook</a>
        </div>
      </footer>
  
    );
  }
  

export default Footer;