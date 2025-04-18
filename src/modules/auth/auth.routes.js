import express from "express";

import { ValidateDto } from '../common/middlewares/index.js';

import connection from '../../database/mysql.db.js';

import { UserRepository } from "../../repository/user/user.repository.js";
import { RoleRepository } from "../../repository/auth/role.repository.js";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";
import { LoginUserDto, RegisterUserDto, ValidateTokenDto } from "./dto/index.js";
import { DTO_SOURCE_PARAMS, DTO_SOURCE_BODY } from '../../constants/constants.js';


const userRepository = new UserRepository(connection);
const roleRepository = new RoleRepository(connection);
const authService = new AuthService(userRepository, roleRepository);
const controller = new AuthController(authService);

const AuthRouter = express.Router();

AuthRouter.get("/login", ValidateDto(LoginUserDto, DTO_SOURCE_BODY), controller.login);
AuthRouter.post("/register", ValidateDto(RegisterUserDto, DTO_SOURCE_BODY), controller.register);
AuthRouter.get("/verifyToken/:token", ValidateDto(ValidateTokenDto, DTO_SOURCE_PARAMS, ["token"]), controller.verifyToken);

export default AuthRouter;