import request from "supertest";
import { handler } from "../netlify/functions/api.js";
describe("Spoonacular API", () => {
  it("should return recipe search results for pasta", async () => {
    const res = await request(handler).get("/.netlify/functions/api/recipes?query=pasta");
    expect(res.statusCode).toBe(200);
    expect(res.body.results).toBeInstanceOf(Array);
  });

  it("should return an error for missing query", async () => {
    const res = await request(handler).get("/.netlify/functions/api/recipes");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Query parameter is required");
  });

  it("should return recipe details for valid ID", async () => {
    const res = await request(handler).get(`/.netlify/functions/api/recipes/716429/information`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(716429);
  });

  it("should return an error for invalid ID", async () => {
    const res = await request(handler).get(`/.netlify/functions/api/recipes/9999999/information`);
    expect(res.statusCode).toBe(500);
  });
});
