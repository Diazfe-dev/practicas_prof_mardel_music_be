import jwt from "jsonwebtoken";
import envVars from "../config/env-vars.js";

export const generateToken = (payload) => {
    return jwt.sign({ ...payload }, envVars.JWT_SECRET, { expiresIn: '1h' });
}

export const verify = (token) => {
    try {
        return jwt.verify(token, envVars.JWT_SECRET);
    }
    catch (error) {
        return false;
    }
}