import { verify, generateToken, encryptPassword, comparePassword } from '../../utils/index.js';

export class AuthService {

    constructor(userRepository, roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    createUser = async (user) => {
        return await this.userRepository.add(user);
    }

    getUserByEmail = async (email) => {
        return await this.userRepository.getByEmail(email);
    }

    getUserById = async (id) => {
        return await this.userRepository.get(id);
    }

    getRoleById = async (id) => {
        return await this.roleRepository.get(id);
    }

    getRoleByName = async (name) => {
        return await this.roleRepository.getByName(name);
    }

    verifyToken = async (token) => {
        return verify(token);
    }

    generateToken = async (payload) => {
        return generateToken(payload);
    }

    hashPassword = async (password) => {
        return encryptPassword(password, 10);
    }

    comparePassword = async (password, hash) => {
        return comparePassword(password, hash);
    }
}