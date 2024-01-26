import { Capability } from "../model/capability";

module.exports.validateCapability = function (capability: Capability): string {
  if (capability.capabilityName.length > 100) {
    return "Capability Name cannot be greater than 100 characters";
  }
  return null;
};
