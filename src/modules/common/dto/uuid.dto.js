export class UUIDDto {
    uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    constructor({ id }) {
        this.id = id;
    }

    validate() {
        const errors = [];
        if (!this.id || !uuidRegex.test(this.id)) errors.push("Invalid UUID format");
        return errors;
    }
}
