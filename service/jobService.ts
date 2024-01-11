import * as dotenv from "dotenv";
import { Job } from "../model/job";
import { Responsibility } from "../model/responsibility";


const axios = require("axios");

dotenv.config();

const API_URL = process.env.API_URL;

module.exports.getJobs = async function (): Promise<Job> {
    try {
        const response = await axios.get(`${API_URL}/api/job-roles`);
        return response.data;
    } catch (e) {
        throw new Error("Could not get jobs");
    }
};

module.exports.getJobSpecById = async function (id: number): Promise<Job> {
    try {
        const response = await axios.get(`${API_URL}/api/job-specification/` + id);
        return response.data;
    } catch (e) {
        throw new Error("Could not get job specification by id");
    }
};

module.exports.getRoleResponsibilityById = async function (id: number): Promise<Responsibility[]> {
    try {
        const response = await axios.get(`${API_URL}/api/responsibilities-per-role/` + id);
        return response.data;
    } catch (e) {
        throw new Error("Could not get role responsibilities by id");
    }
};


