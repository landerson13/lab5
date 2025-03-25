async function getRecipes() {
    const ingredients = document.getElementById('ingredients').value;
    const dietaryRestrictions = document.getElementById('dietaryRestrictions').value;

    if (!ingredients) {
        alert("Please enter ingredients to search for recipes.");
        return;
    }

    try {
        // Construct the query with ingredients and dietary restrictions
        const queryParams = new URLSearchParams();
        queryParams.append('query', ingredients);
        if (dietaryRestrictions) {
            queryParams.append('diet', dietaryRestrictions);  // Assuming the API accepts this parameter
        }

        const response = await fetch(`/.netlify/functions/api/recipes?${queryParams.toString()}`);

        if (!response.ok) {
            throw new Error("Failed to fetch recipes");
        }

        const data = await response.json();

        // Render the results dynamically
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

