import { Job } from "../model/job";

module.exports.validateCapability = function (job: Job ): string {
    if (job.capabilityName.length > 100) {
        return "Capability Name cannot be greater than 100 characters";
    }
    return null;
}