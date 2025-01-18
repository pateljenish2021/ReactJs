import React,{useEffect} from "react";
import './footer.css'
import { Nav } from "react-bootstrap";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import {useNavigate} from "react-router-dom";
import RecipeUploadForm from "../../pages/RecipeUploadForm";

const Footer = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
  })

  const navigate = useNavigate();

  const recipeUpload = () => {
    navigate('/upload');    
    };
  
  const year = new Date().getFullYear()
  return <footer className="footer">
    
  
    <Container>
      <Row>
        <Col className="text-center social" lg='12'>
        <p className="socialp">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <i className="ri-instagram-line"></i>
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <i className="ri-facebook-circle-fill"></i>
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
          <i class="ri-linkedin-box-fill"></i>
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
          <i class="ri-github-fill"></i>
          </a>
        </p>
        </Col>





        <Col lg='12'>
          <p className="footer__copyright">TasteBite<i class="ri-copyright-line"></i>  {year}. All rights reserved. </p>
          <p className="footer__text mt-4">TasteBite: Your virtual culinary companion. Explore diverse <button className="upload-btn" onClick={recipeUpload} element={<RecipeUploadForm />}>recipes</button>, from classic comfort foods to exotic delights. Elevate your cooking experience with step-by-step instructions and tantalizing flavors, all at your fingertips.</p>

        </Col>
      </Row>
    </Container>
  </footer>
};

export default Footer;