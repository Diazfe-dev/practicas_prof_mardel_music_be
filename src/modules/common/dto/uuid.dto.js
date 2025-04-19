export class UUIDDto {
    constructor({ id }) {
        this.id = id;
    }

    validate() {
        const errors = [];
        if (!this.id ) errors.push("UUID is required");
        return errors;
    }
}
