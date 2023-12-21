const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const chai = require("chai");

const expect = chai.expect;
const jobService = require("../../dist/service/jobService");
const responsibility = {
    responsibilityName: "Testing"
};

describe("JobService", () => {
    describe("getRoleResponsibilityById", () => {
        it("should get role responsibilities by id", async () => {
            var mock = new MockAdapter(axios);

            const data = [responsibility];

            mock.onGet("http://localhost:8080/api/responsibilities-per-role/1705").reply(200, data);

            var results = await jobService.getRoleResponsibilityById(1705);

            expect(results[0]).to.deep.equal(responsibility);
        });

        it("should throw 500 error", async () => {
            var mock = new MockAdapter(axios);

            const data = [responsibility];

            mock.onGet("http://localhost:8080/api/responsibilities-per-role/1705").reply(500);

            try {
                await jobService.getRoleResponsibilityById(1705);
            } catch (e) {
                var error = e.message;
            }

            expect(error).to.equal("Could not get role responsibilities by id");

        });
    });
});

    
