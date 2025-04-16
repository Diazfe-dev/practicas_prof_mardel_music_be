class RepositoryBase {
    constructor(connection) {
        this.connection = connection;
    }

    async getAll(pagination) { }

    async get(id) { }

    async add(data) { }

    async update(id, data) { }

    async delete(id) { }
}

export default RepositoryBase;