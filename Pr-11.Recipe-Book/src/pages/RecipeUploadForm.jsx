import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { db } from "../firebase.config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecipeUploadForm = () => {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [vegetarian, setVegetarian] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecipeId, setCurrentRecipeId] = useState("");

  // Modal state for delete confirmation
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Fetch recipes from Firestore
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const recipesRef = collection(db, "recipes");
      const snapshot = await getDocs(recipesRef);
      const recipesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(recipesList);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleCategoryChange = (e) => {
    setCategories(e.target.value.split(",").map((category) => category.trim()));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const recipe = {
        title,
        categories,
        instructions,
        ingredients: ingredients.split(",").map((ingredient) => ingredient.trim()),
        imgUrl: imageUrl,
        vegetarian,
      };

      if (isEditing) {
        // Update recipe
        await updateDoc(doc(db, "recipes", currentRecipeId), recipe);
        toast.success("Recipe updated successfully!");
        setIsEditing(false);
      } else {
        // Add new recipe
        await addDoc(collection(db, "recipes"), recipe);
        toast.success("Recipe uploaded successfully!");
      }

      resetForm();
      fetchRecipes();
    } catch (error) {
      console.error("Error uploading recipe:", error);
      toast.error("An error occurred while uploading the recipe.");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (recipe) => {
    setIsEditing(true);
    setCurrentRecipeId(recipe.id);
    setTitle(recipe.title);
    setCategories(recipe.categories);
    setInstructions(recipe.instructions);
    setIngredients(recipe.ingredients.join(", "));
    setImageUrl(recipe.imgUrl);
    setVegetarian(recipe.vegetarian);
    window.scrollTo(0, 0);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    if (itemToDelete) {
      try {
        await deleteDoc(doc(db, "recipes", itemToDelete));
        toast.success("Recipe deleted successfully!");
        fetchRecipes();
      } catch (error) {
        console.error("Error deleting recipe:", error);
        toast.error("An error occurred while deleting the recipe.");
      } finally {
        setDeleteModalOpen(false);
        setItemToDelete(null);
      }
    }
  };

  const resetForm = () => {
    setTitle("");
    setCategories([]);
    setInstructions("");
    setIngredients("");
    setImageUrl("");
    setVegetarian(false);
    setCurrentRecipeId("");
  };

  return (
    <Container>
      {/* Toast Container */}
      <ToastContainer />

      <Row>
        {/* Recipe Upload Form */}
        <Col md={6} style={{paddingLeft: "30px"}}>
          <h2 className="mt-5 mb-4">{isEditing ? "Edit Recipe" : "Upload Recipe"}<span style={{color: "red", fontSize: "12px"}}>(Login Required*)</span></h2>
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
                <Input
                  type="checkbox"
                  onChange={() => setVegetarian(!vegetarian)}
                  checked={vegetarian}
                />{" "}
                Vegetarian <span style={{ color: "red", fontWeight:"400"}}>(Please check if it Vegetarian)</span>
              </Label>
            </FormGroup>
            <FormGroup>
              <Label for="imageUrl">Image URL</Label>
              <Input
                type="text"
                name="imageUrl"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                required
              />
            </FormGroup>
            <Button type="submit" color="primary" disabled={uploading} className="upload-edit-btn">
              {uploading ? "Uploading..." : isEditing ? "Update Recipe" : "Upload Recipe"}
            </Button>
            {isEditing && (
              <Button
                type="button"
                color="secondary"
                onClick={() => {
                  resetForm();
                  setIsEditing(false);
                }}
                className="ml-2"
              >
                Cancel
              </Button>
            )}
          </Form>
        </Col>

        {/* Recipe List */}
        <Col md={6}>
          <h2 className="mt-5 mb-4">All Recipes</h2>
          <Row className="recipe-list">
            {recipes.map((recipe,index) => (
              <Col key={recipe.id} md={12} className="mb-3">
                <div className="recipe-card">
                  <h2>{index+1}.</h2>
                  <img
                    src={recipe.imgUrl}
                    alt={recipe.title}
                    className="recipe-image"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <div className="name-edit">
                  <h5 style={{width: "100% !important"}}>{recipe.title}</h5>
                  <Button
                    color="warning"
                    size="sm"
                    onClick={() => handleEdit(recipe)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(recipe.id)}
                  >
                    Delete
                  </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <Modal isOpen={isDeleteModalOpen} toggle={() => setDeleteModalOpen(false)}>
          <ModalHeader toggle={() => setDeleteModalOpen(false)}>
            Confirm Removal
          </ModalHeader>
          <ModalBody>
            Are you sure you want to remove this recipe?
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={handleDeleteConfirmation}
            >
              Yes, Remove
            </Button>
            <Button
              color="secondary"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </Container>
  );
};

export default RecipeUploadForm;
