import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import CommonSection from "./CommonSection";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useAuth from "../redux/useAuth"

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeRef = doc(db, "recipes", id);
        const recipeSnap = await getDoc(recipeRef);

        if (recipeSnap.exists()) {
          const recipeData = recipeSnap.data();
          setRecipe(recipeData);

        } else {
          toast.error("Recipe not found");
          navigate('/');
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
        toast.error("An error occurred while fetching the recipe");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, navigate, currentUser]);


  if (loading) {
    return (
      <div className="fullload">
        <div className="loader"></div> 
      </div>
    );
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const { title, categories, instructions, ingredients, imgUrl } = recipe;

  const instructionListItems = instructions.split('\n').map((instruction, index) => (
    <li key={index}>{instruction}</li>
  ));


  return (
    <>
      <CommonSection className='commsect' title={title} hideOnMobile={true}/>

      <section className="pt-0 product-details">
        <Container>
          <Row className="space">
            <Col className="padddd" lg="9">
             <div className="image recipe-img">
              <img src={imgUrl} alt={title} />
             </div>
             <div className="context">
              <h1 className="recipe_title">{title}</h1>
              <div className="categories">
                {categories.map((cat, index) => (
                  <h3 key={index}>{cat}</h3>
                ))}
              </div>
              <ol className="ollo">{instructionListItems}</ol>
             </div>
            </Col>
            <Col lg='3'>
              <div className="island">
                <h4>Ingredients:</h4>
                {ingredients.map((ingredient, index) => (
                  <p key={index}><span className="dot">• </span>{ingredient}</p>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ProductDetails;