import { successResponse, errorResponse } from "../../utils/index.js";

export class UserController {

    constructor(userService) {
        this.userService = userService;
    }

    getAll = async (req, res) => {
        try {
            const validated = req.validated;
            const users = await this.userService.getAll(validated);
            if (!users) return errorResponse(req, res, 'Users not found', 404);
            return successResponse(req, res, users, 200);
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
            return successResponse(req, res, user, 200);
        } catch (error) {
            console.log(error);
            return errorResponse(req, res, error.message, 500);
        }
    }

    getByEmail = async (req, res) => {
        const user = await this.userService.getByEmail(req.params.email);
        if (!user) return errorResponse(req, res, 'User not found', 404);
        return successResponse(req, res, user, 200);
    }

    update = async (req, res) => {
        try {
            const userExists = await this.userService.getByEmail(req.validated.email);
            if (!userExists) return errorResponse(req, res, 'User not found', 404);

            const user = await this.userService.update(req.params.id, req.validated);
            if (!user) return errorResponse(req, res, 'User not found', 404);

            return successResponse(req, res, user, 200);
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

            return successResponse(req, res, user, 200);
        }
        catch (error) {
            console.log(error);
            return errorResponse(req, res, error.message, 500);
        }
    }

    delete = async (req, res) => {
        try {
            const user = await this.userService.delete(req.params.id);
            if (!user) return errorResponse(req, res, 'User not found', 404);

            return successResponse(req, res, user, 200);
        }
        catch (error) {
            console.log(error);
            return errorResponse(req, res, error.message, 500);
        }
    }

}