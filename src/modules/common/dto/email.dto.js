export class EmailDto {
    emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    constructor({ email }) {
        this.email = email;
    }

    validate() {
        const errors = [];
        if (!this.email) errors.push("Email is required");
        if (this.email || !emailRegex.test(this.email)) errors.push("Invalid email format");
        return errors;
    }
}