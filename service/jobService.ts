import { Job } from "../model/job";
import { Responsibility } from "../model/responsibility";
import { Capability } from "../model/capability";

const axios = require("axios");
const capabilityValidator = require("../Validator/capabilityValidator");

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

module.exports.getRoleResponsibilityById = async function (id: number): Promise<Responsibility[]> {
    try {
        const response = await axios.get("http://localhost:8080/api/responsibilities-per-role/" + id);
        return response.data;
    } catch (e) {
        throw new Error("Could not get role responsibilities by id");
    }
};

module.exports.getAllCapabilities = async function (): Promise<Job> {
    try {
        const response = await axios.get("http://localhost:8080/api/capability");
        return response.data;
    } catch (e) {
        throw new Error("Could not get capabilities")
    }
};

module.exports.getCapabilityById = async function (id: number): Promise<Capability> {
    try {
        const response = await axios.get("http://localhost:8080/api/capability/" + id);
        return response.data;
    } catch (e) {
        throw new Error("Could not get Capability");
    }
};

module.exports.updateCapability = async function (job: Job ): Promise<number> {
    const error: string = capabilityValidator.validateCapability(job)
    if(error) {
        throw new Error(error)
    }
    try {
        const response = await axios.put("http://localhost:8080/api/capability/", job)
        return response.data;
    } catch (e) {
        throw new Error("Could not update Capability")
    }
};

