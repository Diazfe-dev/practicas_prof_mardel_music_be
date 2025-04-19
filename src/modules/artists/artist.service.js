export class ArtistService {
    constructor(artistRepository) {
        this.artistRepository = artistRepository;
    }

    getAll = async (pagination) => {
        return await this.artistRepository.getAll(pagination);
    }

    getById = async (id) => {
        return await this.artistRepository.get(id);
    }

    getByName = async (name) => {
        return await this.artistRepository.getByName(name);
    }

    create = async (data) => {
        return await this.artistRepository.create(data);
    }

    update = async (data) => {
        return await this.artistRepository.update(data.id, data);
    }

    delete = async (id) => {
        return await this.artistRepository.delete(id);
    }
}