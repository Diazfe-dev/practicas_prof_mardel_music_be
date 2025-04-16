import { roles } from "../../common/constants.js";
export class RegisterUserDto {
    constructor(data) {
        Object.assign(this, data);
        this.profilePicture = data.profilePicture || '';
        this.role = data.role || 'user';
    }

    validate() {
        const errors = [];

        if (!this.name) errors.push(`[name] is required`);
        if (this.name && this.name.length < 3) errors.push("[name] must be at least 3 characters");
        if (this.name && this.name.length > 50) errors.push("[name] must be at most 50 characters");

        if (!this.lastName) errors.push("[lastName] is required");
        if (this.lastName && this.lastName.length < 3) errors.push("[lastName] must be at least 3 characters");
        if (this.lastName && this.lastName.length > 50) errors.push("[lastName] must be at most 50 characters");

        if (!this.email) errors.push("[email] is required");
        if (this.email && !this.email.includes('@')) errors.push("[email] must be a valid email");
        if (this.email && this.email.length < 3) errors.push("[email] must be at least 3 characters");
        if (this.email && this.email.length > 50) errors.push("[email] must be at most 50 characters");

        if (!this.password) errors.push("[password] is required");
        if (this.password && this.password.length < 6) errors.push("password] must be at least 6 characters");
        if (this.password && this.password.length > 50) errors.push("password] must be at most 50 characters");
        if (this.password && this.password.includes(' ')) errors.push("password] must not contain spaces");

        if (this.profilePicture && !this.profilePicture.startsWith('http')) errors.push("[profilePicture] must be a valid url");

        if (this.role && !roles.includes(this.role)) errors.push("[role] is invalid");

        return errors;
    }
}