// import { exportAllDeclaration } from "@babel/types";
// import { TestWatcher } from "@jest/core";
// import apiCall from "../src/server/mockAPI.js"
// // import mockAxios from "axios";
import mockAxios from 'jest-mock-axios';
const mockApi = require("../src/server/mockAPI.js");
const apiCall = mockApi.method;
// const baseUrl = otherOtherMethod.baseUrl;
// import { url, apiCall } from "../src/server/mockAPI.js";

describe("apiCall", () => {
    afterEach(() => {
        mockAxios.reset();
    })

//     mockAxios.get.mockImplementation(() => Promise.resolve({inputBox : {  "agreement": 'DISAGREEMENT',
//                                                                         "subjectivity": 'SUBJECTIVE',
//                                                                         "confidence": '86',
//                                                                         "irony": 'NONIRONIC'
// }}))

    describe("when API call is successfull", ()=> {
        it("should return inputBox", async () => {
            let req = {bosy: { data: { newUrl: 'https://www.bbc.co.uk/news/business-57724779' } } };
            const baseUrl = "https://api.meaningcloud.com/sentiment-2.1?key=";
            let nUrl = "https://www.bbc.co.uk/news/business-57724779";
            let inputBox = {"agreement": 'DISAGREEMENT',
                            "subjectivity": 'SUBJECTIVE',
                            "confidence": '86',
                            "irony": 'NONIRONIC'};
            mockAxios.get.mockResolvedValueOnce(inputBox);

            const result = await apiCall();

            expect(mockAxios.get).toHaveBeenCalledWith(`${baseUrl}/inputBox`);
            expect(result).toEqual(inputBox)
        })
    })
})

// jest.mock("axios");

// mockAxios.get.mockImplementation(() => Promise.resolve({inputBox : {  "agreement": 'DISAGREEMENT',
// "subjectivity": 'SUBJECTIVE',
// "confidence": '86',
// "irony": 'NONIRONIC'
// }}))
// describe("apiCall", () =>{
//     test("should returl the resultObject from the API", async ()=>{
//         const result = await apiCall(1);
//         console.log(result);
//         expect(result).toBe({inputBox : {  "agreement": 'DISAGREEMENT',
//         "subjectivity": 'SUBJECTIVE',
//         "confidence": '86',
//         "irony": 'NONIRONIC'
//         }})
//     })
// });


// it("Makes a call and returns an object with results for them api", async()=> {
//     const result = await apiCall
//     // expect inputbox to be let inputBox={
//               //   agreement: agreement,
//               //   subjectivity: responce.subjectivity,
//               //   confidence: responce.confidence,
//               //   irony: responce.irony
//               // }
// })