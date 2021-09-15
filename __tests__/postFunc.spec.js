// // ./test/PostFunction.spec.js
// import mockAxios from '../src/__mocks__/axios.js';
// import mockAxios from 'axios';
import mockAxios from 'jest-mock-axios';
import {postData} from '../src/client/js/postFunc';
// const regeneratorRuntime = require("regenerator-runtime");
// jest.mock("axios");
// mockAxios.post.mockImplementation (()=> Promise.resolve())

// describe("postData", () => {
//     test("should get the url from the form and send it to the server", async () => {
//         const results = await postData(1);
//         console.log(results);
//         // expect(results).toBe("data1")
//     })
// });

// const newUrl = await 

afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
});

it('postData should send the url to the server', () => {

    let catchFn = jest.fn();
        // thenFn = jest.fn();

    // using the component, which should make a server response
    let newUrl = "https://www.npmjs.com/package/jest-mock-axios";

    postData(newUrl)
        // .then(thenFn)
        .catch(catchFn);
    
    // since `post` method is a spy, we can check if the server request was correct
    // a) the correct method was used (post)
    // b) went to the correct web service URL ('/url')
    // c) if the payload was correct ('client is saying hello!')
    expect(mockAxios.post).toHaveBeenCalledWith('/url', {newUrl:"https://www.npmjs.com/package/jest-mock-axios"});
    // simulating a server response
    let responseObj = { newUrl:"https://www.npmjs.com/package/jest-mock-axios"};
    mockAxios.mockResponse(responseObj);

    // checking the `then` spy has been called and if the
    // response from the server was converted to upper case
    // expect(thenFn).toHaveBeenCalledWith('SERVER SAYS HELLO!');

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
});