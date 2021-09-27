const request = require("supertest");
const { response } = require("../src/server/app.js");
const app = require("../src/server/app.js");

describe("test the root path", () => {
    test("It should responce the GET method", () => {
        return request(app)
        .get("/")
        .then(response => {
            expect(response.statusCode).toBe(200);
        });
    });
});