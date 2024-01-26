var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");
var chai = require("chai");
const expect = chai.expect;
const JobService = require("../../dist/service/jobService");

const job = {
  roleID: "1001",
  roleName: "Test Role",
  bandName: "Test Band",
};

describe("jobService", function () {
  describe("getJobs", function () {
    it("should return a list of job roles from response", async () => {
      var mock = new MockAdapter(axios);
      const data = [job];

      mock.onGet("http://localhost:8080/api/job-roles").reply(200, data);

      var results = await JobService.getJobs();
      expect(results[0]).to.deep.equal(job);
    });

    it("should throw exception 500 when error returned from axios", async () => {
      var mock = new MockAdapter(axios);
      mock.onGet("http://localhost:8080/api/job-roles").reply(500);
      var error;

      try {
        await JobService.getJobs();
      } catch (e) {
        error = e.message;
      }

      expect(error).to.equal("Could not get jobs");
    });
  });
});
