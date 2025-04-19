import { verify } from "../../../utils/index.js";
import { errorResponse } from "../../../utils/response.js";

import connection from "../../../database/mysql.db.js";
import { UserRepository } from "../../../repository/user/user.repository.js";
import { RoleRepository } from "../../../repository/auth/role.repository.js";

const userRepository = new UserRepository(connection);
const roleRepository = new RoleRepository(connection);

export function RoleGuard(...allowedRoles) {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (!token) throw new Error("Unauthorized");

            const { user: user_id, role: role_id } = verify(token);
            if (!user_id || !role_id) throw new Error("Unauthorized");

            const user = await userRepository.get(user_id);
            if (!user) throw new Error("Unauthorized");

            const userRole = await roleRepository.get(user.role_id);
            if (!userRole) throw new Error("Unauthorized");

            if (!allowedRoles.includes(userRole.role)) {
                throw new Error("Unauthorized");
            }

            next();
        } catch (error) {
            return errorResponse(req, res, `[Invalid Role]: ${error.message}`, 401);
        }
    };
}
