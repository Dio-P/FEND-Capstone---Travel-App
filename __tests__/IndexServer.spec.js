const request = require("supertest");
const { response } = require("../src/server/index.js");
const app = require("../src/server/app.js");
const apiCall= require("../src/server/apiCall.js");


describe("test the result is send back", () => {
    test("It should responce the GET method", () => {
        return request(app)
        .get("/results")
        .then(response => {
            expect(response.statusCode).toBe(200);

        });
    });
});