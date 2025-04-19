import express from "express";

import { UUIDDto } from "../common/dto/uuid.dto.js";
import { EmailDto } from "../common/dto/email.dto.js";
import { PaginationDto } from "../common/dto/pagination.dto.js";
import { DTO_SOURCE_QUERY, ROLE_ADMIN_TAG, DTO_SOURCE_PARAMS, ROLE_USER_TAG } from '../../constants/constants.js';
import { AuthGuard, RoleGuard, ValidateDto } from "../common/middlewares/index.js";

import connection from "../../database/mysql.db.js";
import { UserRepository } from "../../repository/user/user.repository.js";
import { UserService } from "../users/user.service.js";
import { UserController } from "../users/user.controller.js";

const userRepository = new UserRepository(connection);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const UserRouter = express.Router();

UserRouter.get(
    "/getById/:id",
    AuthGuard,
    RoleGuard(ROLE_USER_TAG),
    ValidateDto(UUIDDto, DTO_SOURCE_PARAMS, ["id"]),
    userController.getById);

UserRouter.get(
    "/getAll",
    AuthGuard,
    RoleGuard(ROLE_ADMIN_TAG),
    ValidateDto(PaginationDto, DTO_SOURCE_QUERY, ['page', 'limit']),
    userController.getAll);

UserRouter.get(
    "/getByEmail",
    AuthGuard,
    RoleGuard(ROLE_ADMIN_TAG),
    ValidateDto(EmailDto, DTO_SOURCE_QUERY, ["email"]),
    userController.getByEmail);

UserRouter.put(
    "/update",
    AuthGuard,
    RoleGuard(ROLE_USER_TAG),
    ValidateDto(UUIDDto, DTO_SOURCE_PARAMS, ["id"]),
    userController.update);

UserRouter.post(
    "/create",
    AuthGuard,
    RoleGuard(ROLE_ADMIN_TAG),
    userController.create);

UserRouter.delete(
    "/delete",
    AuthGuard,
    RoleGuard(ROLE_ADMIN_TAG),
    ValidateDto(UUIDDto, DTO_SOURCE_PARAMS, ["id"]),
    userController.delete);

export default UserRouter;