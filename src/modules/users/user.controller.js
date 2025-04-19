import { successResponse, errorResponse } from "../../utils/index.js";

export class UserController {

    constructor(userService) {
        this.userService = userService;
    }

    getAll = async (req, res) => {
        try {
            const validated = req.validated;
            const result = await this.userService.getAll(validated);
            if (!result) return errorResponse(req, res, 'Users not found', 404);
            const { meta, data } = result;

            data.forEach(user => {
                delete user.password;
            });

            return successResponse(req, res, "Users found", { meta, data }, 200);
        }
        catch (error) {
            console.log(error);
            return errorResponse(req, res, error.message, 500);
        }
    }

    getById = async (req, res) => {
        try {
            const { id } = req.validated;
            const user = await this.userService.getUserById(id);
            if (!user) return errorResponse(req, res, 'User not found', 404);

            delete user.password;

            return successResponse(req, res, "User found", user, 200);
        } catch (error) {
            console.log(error);
            return errorResponse(req, res, error.message, 500);
        }
    }

    getByEmail = async (req, res) => {
        try {
            const { email } = req.validated;
            const user = await this.userService.getByEmail(email);
            if (!user) return errorResponse(req, res, 'User not found', 404);

            delete user.password;

            return successResponse(req, res, "User found", user, 200);
        }
        catch (error) {
            console.log(error);
            return errorResponse(req, res, error.message, 500);
        }
    }

    update = async (req, res) => {
        try {
            const { id } = req.validated;
            const userExists = await this.userService.getUserById(id);

            if (!userExists) return errorResponse(req, res, 'User not found', 404);

            const user = await this.userService.update(req.params.id, req.validated);
            if (!user) return errorResponse(req, res, 'User not found', 404);

            const updatedUser = await this.userService.getUserById(id);

            delete updatedUser.password;

            return successResponse(req, res, "User updated successfully", { updatedUser }, 200);
        }
        catch (error) {
            console.log(error);
            return errorResponse(req, res, error.message, 500);
        }
    }

    create = async (req, res) => {
        try {
            const userExists = await this.userService.getByEmail(req.validated.email);
            if (userExists) return errorResponse(req, res, 'User already exists', 409);

            const user = await this.userService.create(req.validated);
            if (!user) return errorResponse(req, res, 'User not found', 404);

            return successResponse(req, res, `User with email ${user.email} created successfully`, user, 200);
        }
        catch (error) {
            console.log(error);
            return errorResponse(req, res, error.message, 500);
        }
    }

    delete = async (req, res) => {
        try {
            const { id } = req.validated;
            const userExists = await this.userService.getUserById(id);
            if (!userExists) return errorResponse(req, res, `User with id: ${id} not found`, 404);

            const user = await this.userService.delete(id);
            if (!user) return errorResponse(req, res, `Error while deleting user with id: ${id}`, 404);

            return successResponse(req, res, `User with id: ${id} was deleted successfully`, _, 200);
        }
        catch (error) {
            console.log(error);
            return errorResponse(req, res, error.message, 500);
        }
    }

}