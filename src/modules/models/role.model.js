export class RoleModel {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
    }
}

export class RoleRepository {
    table = 'Roles';
    constructor(connection) {
        this.connection = connection;
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