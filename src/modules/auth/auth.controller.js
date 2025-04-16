import connection from "../../database/mysql.db.js";
import { successResponse, errorResponse } from "../../common/response.js";
import { generateToken, verify, encryptPassword, comparePassword } from "../../utils/index.js";

import { UserRepository, UserModel } from "../models/user.model.js";
import { RoleRepository } from "../models/role.model.js";

const userRepository = new UserRepository(connection);
const roleRepository = new RoleRepository(connection);

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userRepository.getByEmail(email);
        if (!user) return errorResponse(req, res, 'Invalid credentials (email)', 401);
        const passwordMatch = comparePassword(password, user.password);
        if (!passwordMatch) return errorResponse(req, res, 'Invalid credentials (password)', 401);
        const token = generateToken(user);

        return successResponse(req, res, "Login succesfull", { access_token: token }, 200);
    }
    catch (error) {
        return errorResponse(req, res, error.message, 500);
    }
}

export async function register(req, res) {
    try {

        const { email, password, role } = req.body;

        let userRole;

        if (role) {
            userRole = await roleRepository.getByName(role);
        } else {
            userRole = await roleRepository.getByName('user');
        }
        console.log(userRole.role);

        const userExists = await userRepository.getByEmail(email);
        if (userExists !== undefined) return errorResponse(req, res, 'User already exists', 409);
        const userModel = new UserModel({ ...req.body, role_id: userRole.id });

        delete userModel.id;
        delete userModel.createdAt;
        delete userModel.updatedAt;

        userModel.password = encryptPassword(password);

        await userRepository.add(userModel);

        const createdUser = await userRepository.getByEmail(email);

        if (!createdUser) return errorResponse(req, res, 'User not found', 404);

        const token = generateToken(createdUser);

        return successResponse(req, res, "User created succesfully", { access_token: token }, 201);
    }
    catch (error) {
        return errorResponse(req, res, error.message, 500);
    }
}

export async function verifyToken(req, res) {

    try {
        const { token } = req.params;

        if (!token) return errorResponse(req, res, 'Token is required', 401);

        const { id } = verify(token);
        if (!id) return errorResponse(req, res, 'Invalid token', 403);

        const user = await userRepository.get(id);
        if (!user) return errorResponse(req, res, 'User not found', 404);

        return successResponse(req, res, { access_token: generateToken(user) }, 200);
    }
    catch (error) {
        return errorResponse(req, res, error.message, 500);
    }
}