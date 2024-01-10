import { Job } from "../model/job";
const jobValidator = require("../validator/jobValidator");
const axios = require('axios');

module.exports.getJobs = async function (): Promise<Job> {
    try {
        const response = await axios.get("http://localhost:8080/api/job-roles");
        return response.data;
    } catch (e) {
        throw new Error("Could not get job");
    }
};


module.exports.getJobSpecById = async function (id: number): Promise<Job> {
    try {
        const response = await axios.get("http://localhost:8080/api/job-specification/" + id);
        return response.data;
    } catch (e) {
        throw new Error("Could not get job specification by id");
    }
}

module.exports.updateJob = async function (id:number, updatedJob:Job): Promise<Job> {
    const error: string = jobValidator.validateJob(updatedJob);

    if (error) {
        throw new Error(error);
    }

    try {
        const response = await axios.put("http://localhost:8080/api/edit-job-role/" + id, updatedJob);

        return response.data;
    } catch (e) {
        throw new Error("Could not update job role")
    }
}
