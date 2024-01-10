import { Job } from "../model/job";
module.exports.validateJob = function (job: Job): string {
    if (job.roleName.length > 80) {
        return "Role name greater than 80 characters";
    }
    if (job.capabilityName.length > 80) {
        return "Capability name greater than 80 characters";
    }
    if (job.bandID < 0) {
        return "Band name greater than 80 characters";
    }
    return null;
};