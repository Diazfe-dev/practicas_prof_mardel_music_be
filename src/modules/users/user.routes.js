import express from "express";

import { UUIDDto } from "../common/dto/uuid.dto.js";
import { EmailDto } from "../common/dto/email.dto.js";
import { PaginationDto } from "../common/dto/pagination.dto.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { DTO_SOURCE_QUERY, ROLE_ADMIN_TAG, DTO_SOURCE_PARAMS, ROLE_USER_TAG, DTO_SOURCE_BODY } from '../../constants/constants.js';
import { AuthGuard, RoleGuard, ValidateDto } from "../common/middlewares/index.js";

import connection from "../../database/mysql.db.js";
import { UserRepository } from "../../repository/user/user.repository.js";
import { UserService } from "../users/user.service.js";
import { UserController } from "../users/user.controller.js";

const userRepository = new UserRepository(connection);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const UserRouter = express.Router();

UserRouter.post(
    "/create",
    AuthGuard,
    RoleGuard(ROLE_ADMIN_TAG),
    ValidateDto(CreateUserDto, DTO_SOURCE_BODY),
    userController.create);

UserRouter.put(
    "/update/:id",
    AuthGuard,
    RoleGuard(ROLE_ADMIN_TAG, ROLE_USER_TAG),
    ValidateDto(UUIDDto, DTO_SOURCE_PARAMS, ["id"]),
    ValidateDto(UpdateUserDto, DTO_SOURCE_BODY),
    userController.update);

UserRouter.delete(
    "/delete/:id",
    AuthGuard,
    RoleGuard(ROLE_ADMIN_TAG),
    ValidateDto(UUIDDto, DTO_SOURCE_PARAMS, ["id"]),
    userController.delete);

UserRouter.get(
    "/getAll",
    AuthGuard,
    RoleGuard(ROLE_ADMIN_TAG),
    ValidateDto(PaginationDto, DTO_SOURCE_QUERY, ['page', 'limit']),
    userController.getAll);

UserRouter.get(
    "/getById/:id",
    AuthGuard,
    RoleGuard(ROLE_ADMIN_TAG, ROLE_USER_TAG),
    ValidateDto(UUIDDto, DTO_SOURCE_PARAMS, ["id"]),
    userController.getById);

UserRouter.get(
    "/getByEmail/:email",
    AuthGuard,
    RoleGuard(ROLE_ADMIN_TAG),
    ValidateDto(EmailDto, DTO_SOURCE_PARAMS, ["email"]),
    userController.getByEmail);

export default UserRouter;