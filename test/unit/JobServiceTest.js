const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const chai = require("chai");

const expect = chai.expect;
const jobService = require("../../dist/service/jobService");

const mock = new MockAdapter(axios);

describe("Job Service", () => {
    describe("getRoleResponsibilityById", () => {
        it("should get role responsibilities by id", async () => {
            const mockResponsibilities = "Testing";
            const roleId = 1307;

            mock.onGet(`http://localhost:8080/api/responsibilities-per-role/${roleId}`).reply(200, mockResponsibilities);

            try {
                const responsibilities = await jobService.getRoleResponsibilityById(roleId);

                expect(responsibilities).to.deep.equal(mockResponsibilities);
            } catch (error) {
                throw new Error(`Test failed: ${error.message}`);
            }
        });

        it("should handle errors when getting role responsibilities by id", async () => {
            const roleId = 1706;

            mock.onGet(`http://localhost:8080/api/responsibilities-per-role/${roleId}`).reply(500, { error: "Internal Server Error" });

            try {
                await jobService.getRoleResponsibilityById(roleId);

                throw new Error("Test failed: Expected an error, but none was thrown");
            } catch (error) {
                expect(error.message).to.equal("Could not get role responsibilities by id");
            }
        });
    });
});

