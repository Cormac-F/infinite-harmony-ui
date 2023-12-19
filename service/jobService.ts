import { Job } from "../model/job";

const axios = require("axios");

module.exports.getJobs = async function (): Promise<Job> {
    try {
        const response = await axios.get("http://localhost:8080/api/job-roles");

        return response.data;
    } catch (e) {
        throw new Error("Could not get jobs");
    }
};
  
module.exports.getJobSpecById = async function (id: number): Promise<Job> {
    try {
        const response = await axios.get("http://localhost:8080/api/job-specification/" + id);

        return response.data;
    } catch (e) {
        throw new Error("Could not get job specification by id");
    }
};

