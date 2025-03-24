import request from "supertest";
import { handler } from "../netlify/functions/api.js";

describe("Spoonacular API", () => {
  
  it("should return recipe search results for a valid query", async () => {
    const res = await request(handler).get("/.netlify/functions/api/recipes?query=pasta");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("results");
    expect(Array.isArray(res.body.results)).toBe(true);
  });

  it("should return an error when query parameter is missing", async () => {
    const res = await request(handler).get("/.netlify/functions/api/recipes");
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("Query parameter is required");
  });

  it("should return recipe details for a valid recipe ID", async () => {
    const recipeId = 716429; // Example recipe ID
    const res = await request(handler).get(`/.netlify/functions/api/recipes/${recipeId}/information`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", recipeId);
    expect(res.body).toHaveProperty("title");
  });

  it("should return an error for an invalid recipe ID", async () => {
    const invalidId = 9999999;
    const res = await request(handler).get(`/.netlify/functions/api/recipes/${invalidId}/information`);
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("error");
  });

});
