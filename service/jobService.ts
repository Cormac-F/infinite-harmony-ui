import * as dotenv from "dotenv";
import { Job } from "../model/job";
const axios = require("axios");

dotenv.config();

const { API_URL } = process.env;

console.log(API_URL)

module.exports.getJobs = async function (): Promise<Job> {
    try {
        const response = await axios.get(`${API_URL}/api/job-roles`);
        return response.data;
    } catch (e) {
        throw new Error("Could not get job");
    }
};

module.exports.getJobSpecById = async function (id: number): Promise<Job> {
    try {
        const response = await axios.get(`${API_URL}/api/job-specification/` + id);
        return response.data;
    } catch (e) {
        throw new Error("Could not get job specification by id");
    }
}
