import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateRecipe } from '../redux/slices/recipeSlice'; 

const EditRecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const recipes = useSelector((state) => state.recipes.items);
  const recipe = recipes?.find((item) => String(item.id) === String(id));

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [vegetarian, setVegetarian] = useState(false);

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title || '');
      setCategory(recipe.category || '');
      setInstructions(recipe.instructions || '');
      setIngredients(recipe.ingredients || []);
      setVegetarian(recipe.vegetarian || false);
    }
  }, [recipe]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category || !instructions) {
      toast.error('Please fill in all required fields!');
      return;
    }

    const updatedRecipe = {
      id,
      title,
      category,
      instructions,
      ingredients,
      vegetarian,
    };

    dispatch(recipeActions.updateRecipe(updatedRecipe));
    toast.success('Recipe updated successfully!');
    navigate(`/recipes/${id}`);
  };

  if (!recipe) {
    return <p>Recipe not found. Please check the URL or try again later.</p>;
  }

  return (
    <div className="edit-recipe-page">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-input">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={vegetarian}
              onChange={(e) => setVegetarian(e.target.checked)}
            />
            Vegetarian
          </label>
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditRecipePage;
