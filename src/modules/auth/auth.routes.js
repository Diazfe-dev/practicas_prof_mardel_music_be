import express from "express";
import { validateDto } from "../../middlewares/validateDto.js";
import { LoginUserDto } from '../dto/login-user.dto.js';
import { RegisterUserDto } from '../dto/register-user.dto.js';
import { ValidateTokenDto } from '../dto/validate-token.dto.js';
import { login, register, verifyToken } from "../auth/auth.controller.js";

const router = express.Router();

router.get(
    "/login",
    validateDto(LoginUserDto, "body"),
    async (req, res) => await login(req, res));

router.post(
    "/register",
    validateDto(RegisterUserDto, "body"),
    async (req, res) => await register(req, res));

router.get(
    "/verifyToken/:token",
    validateDto(ValidateTokenDto, "params", "token"),
    async (req, res) => await verifyToken(req, res));

export default router;