import { RepositoryBase } from "../repository.base.js";

export class UserRepository extends RepositoryBase {

    table = 'Users';

    constructor(connection) {
        super(connection);
    }

    async connect() {
        await this.connection.connect();
    }

    async disconnect() {
        await this.connection.end();
    }

    async getAll(paginationDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const offset = (page - 1) * limit;

        const [data] = await this.connection.query(
            `SELECT * FROM ${this.table} LIMIT ? OFFSET ?`,
            [limit, offset]
        );

        const [[{ total }]] = await this.connection.query(
            `SELECT COUNT(*) as total FROM ${this.table}`
        );

        return { meta: { page, limit, total }, data, };
    }

    async get(id) {
        const [row] = await this.connection.query(
            `SELECT * FROM ${this.table} WHERE id = ?`, [id]
        );
        return row[0];
    }

    async getByEmail(email) {
        const [row] = await this.connection.query(
            `SELECT * FROM ${this.table} WHERE email = ?`,
            [email]
        );
        return row[0];
    }

    async getUsersByRole(role) {
        const [rows] = await this.connection.query(
            `SELECT * FROM ${this.table} JOIN Roles ON Users.role_id = Roles.id WHERE Roles.role = ?`,
            [role]
        )
    }

    async add(data) {
        const [row] = await this.connection.query(
            `INSERT INTO ${this.table} (${Object.keys(data).join(", ")}) VALUES (?, ?, ?, ?, ?, ?)`,
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
        const [row] = await this.connection.query(
            `DELETE FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return row;
    }
}
