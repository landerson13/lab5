async function getRecipes() {
    const query = document.getElementById('ingredients').value;
    if (!query) {
        alert("Please enter ingredients to search for recipes.");
        return;
    }
    
    try {
        const response = await fetch(`/.netlify/functions/api/recipes?query=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch recipes");
        }
        
        const data = await response.json();
        
        document.getElementById('results').innerHTML = data.results.map(recipe => `
            <div class="recipe">
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}">
            </div>
        `).join('');
    } catch (error) {
        console.error("Error fetching recipes:", error);
        document.getElementById('results').innerHTML = "<p>Error fetching recipes. Please try again.</p>";
    }
}
