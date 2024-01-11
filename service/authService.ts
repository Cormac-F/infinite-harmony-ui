import * as dotenv from "dotenv";
import { Login } from "../model/auth";
const axios = require("axios");

dotenv.config();

const { API_URL } = process.env;

module.exports.login = async function (login: Login): Promise<void> {
    try {
        const response = await axios.post(`${API_URL}/api/login`, login);

        return response.data;
    } catch (e) {
        throw new Error("Could not login");
    }
};