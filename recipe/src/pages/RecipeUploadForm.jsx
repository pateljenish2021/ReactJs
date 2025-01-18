import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { db, storage } from "../firebase.config";
import { doc, setDoc, collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const RecipeUploadForm = () => {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState(null);
  const [vegetarian, setVegetarian] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const checkRecipeCollection = async () => {
      try {
        const recipesRef = collection(db, "recipes");
        const snapshot = await getDocs(recipesRef);
        if (snapshot.size === 0) {
          await addDoc(recipesRef, { exists: true });
        }
      } catch (error) {
        console.error("Error checking recipes collection:", error);
      }
    };

    checkRecipeCollection();
  }, []);

  const handleCategoryChange = (e) => {
    setCategories(e.target.value.split(",").map(category => category.trim()));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const storageRef = ref(storage, `recipe_images/${image.name}`);
      await uploadBytes(storageRef, image);

      const imageUrl = await getDownloadURL(storageRef);

      const recipe = {
        title,
        categories,
        instructions,
        ingredients: ingredients.split(",").map((ingredient) => ingredient.trim()),
        imgUrl: imageUrl,
        vegetarian,
      };

      await setDoc(doc(db, "recipes", title), recipe);

      setTitle("");
      setCategories([]);
      setInstructions("");
      setIngredients("");
      setImage(null);
      setVegetarian(false); 

      alert("Recipe uploaded successfully!");
    } catch (error) {
      console.error("Error uploading recipe:", error);
      alert("An error occurred while uploading the recipe. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <h2 className="mt-5 mb-4">Upload Recipe</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="categories">Categories (Separated by Commas)</Label>
              <Input
                type="text"
                name="categories"
                id="categories"
                value={categories.join(", ")}
                onChange={handleCategoryChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="instructions">Instructions</Label>
              <Input
                type="textarea"
                name="instructions"
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="ingredients">Ingredients (Separated by Commas)</Label>
              <Input
                type="text"
                name="ingredients"
                id="ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" onChange={() => setVegetarian(!vegetarian)} checked={vegetarian} /> Vegetarian
              </Label>
            </FormGroup>
            <FormGroup>
              <Label for="image">Image</Label>
              <Input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </FormGroup>
            <Button type="submit" color="primary" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload Recipe"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeUploadForm;
