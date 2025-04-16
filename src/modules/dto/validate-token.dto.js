import { verify } from "../../utils/index.js";

export class ValidateTokenDto {
    constructor(data) {
        Object.assign(this, data);
        this.token = data.token;
    }

    validate() {
        const errors = [];
        if (!this.token) errors.push("Token is required");
        if (this.token && verify(this.token) === false) errors.push("Invalid token");

        return errors;
    }
}