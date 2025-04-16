import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import envVars from "../config/env-vars.js";

export const generateToken = (user) => {
    return jwt.sign({ id: user.id }, envVars.JWT_SECRET, { expiresIn: '1h' });
}

export const verify = (token) => {
    try {
        const isValid = jwt.verify(token, envVars.JWT_SECRET);
        return isValid;
    }
    catch (error) {
        return false;
    }
}

export const encryptPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

export const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}
