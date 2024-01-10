import * as dotenv from "dotenv";
import { Job } from "../model/job";
import { Responsibility } from "../model/responsibility";
import { Capability } from "../model/capability";

const axios = require("axios");
const capabilityValidator = require("../Validator/capabilityValidator");

dotenv.config();

const API_URL = process.env.API_URL;

module.exports.getAllCapabilities = async function (): Promise<Capability> {
    try {
        const response = await axios.get(`${API_URL}/api/capability`);
        return response.data;
    } catch (e) {
        throw new Error("Could not get capabilities")
    }
};

module.exports.getCapabilityById = async function (id: number): Promise<Capability> {
    try {
        const response = await axios.get(`${API_URL}/api/capability/` + id);
        return response.data;
    } catch (e) {
        throw new Error("Could not get Capability");
    }
};

module.exports.updateCapability = async function (capability: Capability ): Promise<number> {
    const error: string = capabilityValidator.validateCapability(capability)
    if(error) {
        throw new Error(error)
    }
    try {
        const response = await axios.put(`${API_URL}/api/capability/` + capability.capabilityID , capability)
        return response.data;
    } catch (e) {
        throw new Error("Could not update Capability")
    }
};