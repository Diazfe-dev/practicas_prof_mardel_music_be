import { RepositoryBase } from "../repository.base.js";

export class RoleRepository extends RepositoryBase {

    table = 'Roles';

    constructor(connection) {
        super(connection);
    }

    async getAll() {
        const [rows] = await this.connection.query(`SELECT * FROM ${this.table}`);
        return rows;
    }

    async get(id) {
        const [row] = await this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
        return row[0];
    }

    async getByName(name) {
        const [row] = await this.connection.query(`SELECT * FROM ${this.table} WHERE role = ?`, [name]);
        return row[0];
    }

}