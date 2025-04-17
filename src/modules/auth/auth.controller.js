import { UserModel } from "../auth/models/user.model.js";
import { errorResponse, successResponse } from "../../utils/index.js";
export class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login = async (req, res) => {
        try {
            const { email, password } = req.validated;
            const user = await this.authService.getUserByEmail(email);
            if (!user) return errorResponse(req, res, 'Invalid credentials (email)', 401);

            const passwordMatch = await this.authService.comparePassword(password, user.password);
            if (!passwordMatch) return errorResponse(req, res, 'Invalid credentials (password)', 401);

            const role = await this.authService.getRoleById(user.role_id);
            if (!role) return errorResponse(req, res, 'Invalid role', 403);

            const token = await this.authService.generateToken({ user: user.id, role: role.id });
            if (!token) throw new Error("Error generating token");

            return successResponse(req, res, "Login succesfull", { access_token: token }, 200);
        }
        catch (error) {
            console.log(error);
            return errorResponse(req, res, error.message, 500);
        }
    }

    register = async (req, res) => {
        try {
            const { email, password, role } = req.body;

            let userRole;

            if (role) {
                userRole = await this.authService.getRoleByName(role);
            } else {
                userRole = await this.authService.getRoleByName('user');
            }

            const userExists = await this.authService.getUserByEmail(email);
            if (userExists !== undefined) return errorResponse(req, res, 'User already exists', 409);

            const { id, createdAt, updatedAt, ...userModel } = new UserModel({ ...req.body, role_id: userRole.id });
            userModel.password = await this.authService.hashPassword(password);

            await this.authService.createUser(userModel);

            const createdUser = await this.authService.getUserByEmail(email);
            if (!createdUser) return errorResponse(req, res, 'User not found', 404);

            const token = await this.authService.generateToken({ user: createdUser.id, role: userRole.id });
            return successResponse(req, res, "User created succesfully", { access_token: token }, 201);
        }
        catch (error) {
            console.log(error);
            return errorResponse(req, res, error.message, 500);
        }
    }

    verifyToken = async (req, res) => {
        try {
            const { token } = req.validated;
            if (!token) return errorResponse(req, res, 'Token is required', 401);

            const { user: user_id, role: role_id } = await this.authService.verifyToken(token);
            if (!user_id || !role_id) return errorResponse(req, res, 'Invalid token', 403);

            const user = await this.authService.getUserById(user_id);
            if (!user) return errorResponse(req, res, 'User not found', 404);

            const userRole = await this.authService.getRoleById(role_id);
            if (!userRole) return errorResponse(req, res, 'Invalid role', 403);

            const jwtToken = await this.authService.generateToken({ user: user.id, role: userRole.id });
            return successResponse(req, res, { access_token: jwtToken }, 200);
        }
        catch (error) {
            console.log(error);
            return errorResponse(req, res, error.message, 500);
        }
    }
}
