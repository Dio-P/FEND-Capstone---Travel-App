import { handleSubmit } from "../src/client/js/formHandler";
// import { CreateNURL } from "../src/client/js/formHandler";


// global.document = {
//     getElementsById: () => { return { value: 'http://google.com' } }
// }

describe("Test: New litepicker", () => {
    test("Should be defined", () => {
        const TotalDays = "22"
        const mockLitepicker = new Litepicker({
            element: document.getElementById('datepicker'),
            singleMode: false,
            tooltipText: {
              one: 'night',
              other: 'nights'
            },
            tooltipNumber: (totalDays) => {
              TotalDays= totalDays - 1;
              return totalDays - 1;
            }
        })
        const spy = jest
      .spyOn(global, 'Litepicker')
      .mockImplementation(() => mockLitepicker)

        expect(handleSubmit).toBeDefined();
})
});

describe("Test: 'handleSubmit()'", () => {
    test("Should be defined", () => {
        expect(handleSubmit).toBeDefined();
    });

    test('Should be a function', () => {
        expect(typeof handleSubmit).toBe("function");
    });
});
