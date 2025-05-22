const form = document.getElementById('recipeForm');
const recipeList = document.getElementById('recipe-list');
const searchBar = document.getElementById('searchBar');

let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const ingredients = document.getElementById('ingredients').value.trim();
  const steps = document.getElementById('steps').value.trim();
  const imageInput = document.getElementById('image');
  const file = imageInput.files[0];

  if (!name || !ingredients || !steps) return alert('Please fill in all fields.');

  const reader = new FileReader();
  reader.onloadend = () => {
    const newRecipe = {
      id: Date.now(),
      name,
      ingredients,
      steps,
      image: reader.result || ''
    };
    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    renderRecipes(recipes);
    form.reset();
  };

  file ? reader.readAsDataURL(file) : reader.onloadend();
});

searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase();
  const filtered = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(query) ||
    recipe.ingredients.toLowerCase().includes(query)
  );
  renderRecipes(filtered);
});

function renderRecipes(data) {
  recipeList.innerHTML = '';
  data.forEach(({ name, ingredients, steps, image }) => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
        ${image ? `<img src="${image}" alt="${name}">` : ''}
        <div class="recipe-card-content">
            <h3>${name}</h3>
            <p><strong>Ingredients:</strong> ${ingredients}</p>
            <p><strong>Steps:</strong> ${steps}</p>
        </div>
        `;
    recipeList.appendChild(card);
  });
}

renderRecipes(recipes);
