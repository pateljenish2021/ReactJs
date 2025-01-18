import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { toast } from "react-toastify";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
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
  const [otherRecipes, setOtherRecipes] = useState([]);
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [userRated, setUserRated] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); 
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeRef = doc(db, "recipes", id);
        const recipeSnap = await getDoc(recipeRef);

        if (recipeSnap.exists()) {
          const recipeData = recipeSnap.data();
          setRecipe(recipeData);
          setRating(recipeData.rating || 0);
          setNumReviews(recipeData.numReviews || 0);

          if (currentUser) {
            const userRatedRef = doc(db, "user_ratings", `${id}_${currentUser.uid}`);
            const userRatedSnap = await getDoc(userRatedRef);
            if (userRatedSnap.exists()) {
              setUserRated(true);
              setUserRating(userRatedSnap.data().rating);
            }
          }

          const category = recipeData.categories[0];
          const recipesRef = collection(db, "recipes");
          const q = query(recipesRef, where("categories", "array-contains", category));
          const querySnapshot = await getDocs(q);
          const otherRecipesData = [];
          querySnapshot.forEach((doc) => {
            if (doc.id !== id) {
              otherRecipesData.push({ id: doc.id, ...doc.data() });
            }
          });
          setOtherRecipes(otherRecipesData);
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

  const handleRating = async (newRating) => {
    try {
      if (!currentUser) {
        toast.error("Please log in to rate the recipe.");
        return;
      }

      if (userRated) {
        toast.error("You have already rated this recipe.");
        return;
      }

      const userRatedRef = doc(db, "user_ratings", `${id}_${currentUser.uid}`);
      await setDoc(userRatedRef, { rating: newRating });

      const updatedRating = (rating * numReviews + newRating) / (numReviews + 1);
      const recipeRef = doc(db, "recipes", id);
      await updateDoc(recipeRef, { rating: updatedRating, numReviews: numReviews + 1 });
      setRating(updatedRating);
      setNumReviews(numReviews + 1);
      setUserRated(true);
      setUserRating(newRating);

      toast.success("Thank you for rating this recipe!");
    } catch (error) {
      console.error("Error updating rating:", error);
      toast.error("An error occurred while updating the rating");
    }
  };

  const handleMouseEnter = (index) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

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

  const starIcons = [];
  const roundedRating = Math.round(rating);
  for (let i = 0; i < 5; i++) {
    starIcons.push(
      <i
        key={i}
        className={i < roundedRating ? "ri-star-fill" : "ri-star-line"}
      />
    );
  }

  const rateRecipeStars = [];
  for (let i = 0; i < 5; i++) {
    rateRecipeStars.push(
      <i
        key={i}
        className={i < hoverRating ? "ri-star-fill" : "ri-star-line"}
        onMouseEnter={() => handleMouseEnter(i)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleRating(i + 1)}
      />
    );
  }

  return (
    <Helmet title={title}>
      <CommonSection className='commsect' title={title} hideOnMobile={true}/>

      <section className="pt-0">
        <Container>
          <Row className="space">
            <Col className="padddd" lg="9">
             <div className="image">
              <img src={imgUrl} alt={title} />
             </div>
             <div className="context">
              <h1 className="recipe_title">{title}</h1>
              <div className="categories">
                {categories.map((cat, index) => (
                  <h3 key={index}>{cat}</h3>
                ))}
              </div>
              <div className="rating">
                {starIcons}
                <span>({numReviews} Reviews)</span>
              </div>
              <ol className="ollo">{instructionListItems}</ol>
             </div>
            </Col>
            <Col lg='3'>
              <div className="island">
                <h4>Ingredients</h4>
                {ingredients.map((ingredient, index) => (
                  <p key={index}><input type="checkbox" /> {ingredient}</p>
                ))}
              </div>
              <div className="mt-4 island">
                {currentUser && !userRated && (
                  <div className="rate-recipe">
                    <h4>Rate this Recipe:</h4>
                    <div className="rate-recipe-stars">
                      {rateRecipeStars}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-5 islanno island">
                <h4>Other Recipes:</h4>
                <ProductsLis data={otherRecipes} />
              </div>
             
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
