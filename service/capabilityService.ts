import { Job } from "../model/job";
import { Responsibility } from "../model/responsibility";
import { Capability } from "../model/capability";

const axios = require("axios");
const capabilityValidator = require("../Validator/capabilityValidator");


module.exports.getAllCapabilities = async function (): Promise<Capability> {
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

module.exports.updateCapability = async function (capability: Capability ): Promise<number> {
    const error: string = capabilityValidator.validateCapability(capability)
    if(error) {
        throw new Error(error)
    }
    try {
        const response = await axios.put("http://localhost:8080/api/capability/" + capability.capabilityID , capability)
        return response.data;
    } catch (e) {
        throw new Error("Could not update Capability")
    }
};