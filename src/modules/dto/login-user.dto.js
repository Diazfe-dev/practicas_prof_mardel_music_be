export class LoginUserDto {
    constructor(data) {
        Object.assign(this, data);
        this.email = data.email;
        this.password = data.password;
    }

    validate() {
        const errors = [];

        if (!this.email) errors.push("Email is required");
        if (this.email && !this.email.includes('@')) errors.push("Valid email is required");
        if (this.email && this.email.length < 3) errors.push("Email must be at least 3 characters");
        if (this.email && this.email.length > 50) errors.push("Email must be at most 50 characters");

        if (!this.password) errors.push("Password is required");
        if (this.password && this.password.length < 6) errors.push("Password must be at least 6 characters");
        if (this.password && this.password.length > 50) errors.push("Password must be at most 50 characters");
        if (this.password && this.password.includes(' ')) errors.push("Password must not contain spaces");

        return errors;
    }
}