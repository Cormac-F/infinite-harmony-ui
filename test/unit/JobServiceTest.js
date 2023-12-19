const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const chai = require("chai");

const expect = chai.expect;
const jobService = require("../../dist/service/jobService");

// Mocking Axios for testing purposes
const mock = new MockAdapter(axios);

describe("Job Service", () => {
    describe("getRoleResponsibilityById", () => {
        it("should get role responsibilities by id", async () => {
            // Set up your mock data here
            const mockResponsibilities = "Testing";
            const roleId = 1307;

            // Mock the Axios request
            mock.onGet(`http://localhost:8080/api/responsibilities-per-role/${roleId}`).reply(200, mockResponsibilities);

            try {
                // Call the function you want to test
                const responsibilities = await jobService.getRoleResponsibilityById(roleId);

                // Assert that the returned data matches the mock data
                expect(responsibilities).to.deep.equal(mockResponsibilities);
            } catch (error) {
                // Handle any unexpected errors
                throw new Error(`Test failed: ${error.message}`);
            }
        });

        it("should handle errors when getting role responsibilities by id", async () => {
            // Set up your mock error response here
            const roleId = 1706;

            // Mock the Axios request to simulate an error
            mock.onGet(`http://localhost:8080/api/responsibilities-per-role/${roleId}`).reply(500, { error: "Internal Server Error" });

            try {
                // Call the function you want to test
                await jobService.getRoleResponsibilityById(roleId);

                // If the function does not throw an error, the test should fail
                throw new Error("Test failed: Expected an error, but none was thrown");
            } catch (error) {
                // Assert that the error message matches the expected message
                expect(error.message).to.equal("Could not get role responsibilities by id");
            }
        });
    });
});

