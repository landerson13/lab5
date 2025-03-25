async function getRecipes() {
    // Get the user input values for ingredients and dietary restrictions
    const ingredients = document.getElementById('ingredients').value;
    const dietaryRestrictions = document.getElementById('dietaryRestrictions').value;

    // If ingredients input is empty, alert the user and stop execution
    if (!ingredients) {
        alert("Please enter ingredients to search for recipes.");
        return;
    }

    try {
        // Prepare query parameters to send in the API request
        const queryParams = new URLSearchParams();
        queryParams.append('query', ingredients);
        if (dietaryRestrictions) {
            queryParams.append('diet', dietaryRestrictions);
        }

        // Make the API request
        const response = await fetch(`/.netlify/functions/api/recipes?${queryParams.toString()}`);

        // Throws error if response is not valid
        if (!response.ok) {
            throw new Error("Failed to fetch recipes");
        }

        const data = await response.json();

        // Displays the results of search
        document.getElementById('results').innerHTML = data.results.map(recipe => `
            <div class="recipe">
                <h3>${recipe.title}</h3>  <!-- Recipe title -->
                <img src="${recipe.image}" alt="${recipe.title}">
            </div>
        `).join('');

    } 
    
    // Catches the error if occurs
    catch (error) {
        console.error("Error fetching recipes:", error);
        document.getElementById('results').innerHTML = "<p>Error fetching recipes. Please try again.</p>";
    }
}


