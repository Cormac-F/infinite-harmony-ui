import { randomBytes } from "crypto";

const generateRandomKey = () => {
    const randomBytesResult = randomBytes(32);
    return randomBytesResult.toString("hex");
};

const config = {
    APP_SECRET_KEY: process.env.APP_SECRET_KEY || generateRandomKey()
};

export default config;