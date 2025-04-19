import { roles } from '../../../constants/constants.js';

export class UpdateUserDto {
    constructor(data) {
        Object.assign(this, data);
    }

    validate() {
        console.log("Update user dto", this);
        const errors = [];

        if (this.name !== undefined) {
            if (this.name.length < 3) errors.push("[name] must be at least 3 characters");
            if (this.name.length > 50) errors.push("[name] must be at most 50 characters");
        }

        if (this.lastName !== undefined) {
            if (this.lastName.length < 3) errors.push("[lastName] must be at least 3 characters");
            if (this.lastName.length > 50) errors.push("[lastName] must be at most 50 characters");
        }

        if (this.email !== undefined) {
            if (!this.email.includes('@')) errors.push("[email] must be a valid email");
            if (this.email.length < 3) errors.push("[email] must be at least 3 characters");
            if (this.email.length > 50) errors.push("[email] must be at most 50 characters");
        }

        if (this.password !== undefined) {
            if (this.password.length < 6) errors.push("[password] must be at least 6 characters");
            if (this.password.length > 50) errors.push("[password] must be at most 50 characters");
            if (this.password.includes(' ')) errors.push("[password] must not contain spaces");
        }

        if (this.profilePicture !== undefined && !this.profilePicture.startsWith('http')) {
            errors.push("[profilePicture] must be a valid url");
        }

        if (this.role !== undefined && !roles.includes(this.role)) {
            errors.push("[role] is invalid");
        }

        return errors;
    }
}