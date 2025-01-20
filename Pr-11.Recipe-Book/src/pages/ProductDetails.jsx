import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import CommonSection from "../components/UI/CommonSection";
import { toast } from "react-toastify";
import Slider from "react-slick";
import { db } from "../firebase.config";
import { doc, getDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import dellog from '../assets/images/dellog.png';
import { useNavigate } from "react-router-dom";
import "../styles/product-details.css";
import ProductsLis from "../components/UI/ProductsLis";
import useAuth from "../custom-hooks/useAuth"
import { setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { favActions } from "../redux/slices/favSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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


          const category = recipeData.categories[0];
          const recipesRef = collection(db, "recipes");
          const q = query(recipesRef, where("categories", "array-contains", category));
          const querySnapshot = await getDocs(q);
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

  const handleAddToFavorites = () => {
    if (!recipe) return;

    dispatch(favActions.addItem(recipe));
    toast.success("Recipe added to favorites!");
  };

  if (loading) {
    return (
      <div className="fullload">
        <div class="loader"></div> 
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