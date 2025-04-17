import connection from "../../../database/mysql.db.js";
import { verify } from "../../../utils/index.js";
import { errorResponse } from "../../../utils/response.js";

import { UserRepository } from "../../../repository/user/user.repository.js";

const userRepository = new UserRepository(connection);

export async function AuthGuard(req, res, next) {

    try {
        const token = req.headers.authorization;
        if (!token) throw new Error("Unauthorized");

        const { user: user_id, role: role_id } = verify(token);
        if (!user_id || !role_id) throw new Error("Unauthorized");

        const user = userRepository.get(user_id);
        if (!user) throw new Error("Unauthorized");
        
        return next();
    } catch (error) {
        return errorResponse(req, res, `[Invalid Token]: ${error.message}`, 401);
    }
}
