export class UserModel {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.lastName = data.lastName;
        this.email = data.email;
        this.password = data.password;
        this.profilePicture = data.profilePicture || '';
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.role_id = data.role_id;
    }
}