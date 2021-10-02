const { postData } = require("../src/client/js/postFunc.js")
describe("Test=> 'postData()'", () => {
    test("Should be defined", () => {
        expect(postData).toBeDefined();
    });

    test("apiCall should be a function", () => {
        expect(typeof postData).toBe("function");
    });
});