import { verify } from "../utils/index.js";
import { errorResponse } from "../common/response.js";
import { UserRepository } from "../modules/models/user.model.js";
import connection from "../database/mysql.db.js";
const userRepository = new UserRepository(connection);

export async function authGuard(req, res, next) {

    try {
        const token = req.headers.authorization;
        if (!token) throw new Error("Unauthorized");
        const { id } = verify(token);
        if (!id) throw new Error("Unauthorized");
        const user = userRepository.get(id);
        if (!user) throw new Error("Unauthorized");
        req.user = user;
        return next();
    } catch (error) {
        return errorResponse(req, res, `[Invalid Token]: ${error.message}`, 401);
    }
}

export function roleGuard(role) {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (!token) throw new Error("Unauthorized");

            const { id } = verify(token);
            if (!id) throw new Error("Unauthorized");

            const user = await userRepository.get(id);
            if (!user) throw new Error("Unauthorized");

            if (user.role !== role) throw new Error("Unauthorized");

            next();
        }
        catch (error) {
            return errorResponse(req, res, `[Invalid Role]: ${error.message}`, 401); 
        }
    }
}