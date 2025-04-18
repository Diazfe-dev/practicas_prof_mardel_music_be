import { RepositoryBase } from "../repository.base.js";

export class ArtistRepository extends RepositoryBase {
    table = 'Artists';

    constructor(connection) {
        super(connection);
    }

    async get(id) {
        const [rows] = await this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
        return rows[0];
    }

    async getAll(pagination) {
        const { page = 1, limit = 10 } = pagination;
        const offset = (page - 1) * limit;

        const [rows] = await this.connection.query(
            "SELECT * FROM Artists LIMIT ? OFFSET ?",
            [limit, offset]
        );

        const [[{ total }]] = await this.connection.query(
            "SELECT COUNT(*) as total FROM Artists"
        );

        return { meta: { page, limit, total }, data: rows };

    }

    async create(data) {
        const [row] = await this.connection.query(
            `INSERT INTO ${this.table} (${Object.keys(data).join(", ")}) 
            VALUES (${Object.keys(data).map(key => `?`).join(", ")})`,
            Object.values(data)
        );

        return row[0];
    }

    async update(id, data) {
        const [row] = await this.connection.query(
            `UPDATE ${this.table} SET ${Object.keys(data).map(key => `${key} = ?`).join(", ")} WHERE id = ?`,
            Object.values(data).concat(id)
        );
        return row;
    }

    async delete(id) {
        const [row] = await this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
        return row;
    }
}