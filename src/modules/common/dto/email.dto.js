export class EmailDto {

    constructor({ email }) {
        this.email = email;
    }

    validate() {
        const errors = [];
        if (!this.email) errors.push("Email is required");
        if (this.email && !this.email.includes("@")) errors.push("Invalid email format");
        return errors;
    }
}