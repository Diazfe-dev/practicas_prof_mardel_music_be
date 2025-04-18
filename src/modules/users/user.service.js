
export class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    getAll = async (pagination) => {
        return await this.userRepository.getAll(pagination);
    }

    getById = async (id) => {
        return await this.userRepository.get(id);
    }

    getByEmail = async (email) => {
        return await this.userRepository.getByEmail(email);
    }

    update = async (id, data) => {
        return await this.userRepository.update(id, data);
    }

    create = async (data) => {
        return await this.userRepository.create(data);
    }

    delete = async (id) => {
        return await this.userRepository.delete(id);
    }
}