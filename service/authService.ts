import { Login } from "../model/auth";
const axios = require("axios");

module.exports.login = async function (login: Login): Promise<void> {
    try {
        const response = await axios.post("http://localhost:8080/api/login", login);

        return response.data;
    } catch (e) {
        throw new Error("Could not login");
    }
}