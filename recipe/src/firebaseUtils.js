import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from './firebase.config'; // Import your Firestore database

// Function to update a recipe in Firebase
export const updateRecipeInFirebase = async (updatedRecipe) => {
  const recipeRef = doc(db, 'recipes', updatedRecipe.id); // Reference to the document in Firestore
  
  try {
    await updateDoc(recipeRef, {
      title: updatedRecipe.title,
      category: updatedRecipe.category,
      instructions: updatedRecipe.instructions,
      ingredients: updatedRecipe.ingredients,
    });
    console.log('Recipe updated in Firebase');
  } catch (error) {
    console.error('Error updating recipe in Firebase: ', error);
  }
};

// Function to delete a recipe from Firebase
export const deleteRecipeFromFirebase = async (recipeId) => {
  const recipeRef = doc(db, 'recipes', recipeId); // Reference to the document in Firestore
  
  try {
    await deleteDoc(recipeRef); // Delete the recipe document
    console.log('Recipe deleted from Firebase');
  } catch (error) {
    console.error('Error deleting recipe from Firebase: ', error);
  }
};
