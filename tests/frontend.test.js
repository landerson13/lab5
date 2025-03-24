const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

describe("Recipe Recommender UI", () => {
    let dom;
    let document;

    beforeEach(() => {
        dom = new JSDOM(html);
        document = dom.window.document;
    });

    it("should have an input field for ingredients", () => {
        const input = document.querySelector("#ingredients");
        expect(input).not.toBeNull();
    });

    it("should have an input field for dietary restrictions", () => {
        const input = document.querySelector("#dietaryRestrictions");
        expect(input).not.toBeNull();
    });

    it("should have a button to get recipes", () => {
        const button = document.querySelector("button");
        expect(button).not.toBeNull();
        expect(button.textContent).toBe("Get Recipes");
    });

    it("should have a results div", () => {
        const resultsDiv = document.querySelector("#results");
        expect(resultsDiv).not.toBeNull();
    });
});
