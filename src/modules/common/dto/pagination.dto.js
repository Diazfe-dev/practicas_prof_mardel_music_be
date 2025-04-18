export class PaginationDto {
    page;
    limit;

    constructor(data) {
        this.page = data.page ? parseInt(data.page) : 1;
        this.limit = data.limit ? parseInt(data.limit) : 10;
    }

    validate() {
        const errors = [];
        if (this.page && typeof this.page !== 'number') errors.push("Page must be a number.");
        if (this.page && this.page < 0) errors.push("Page must be greater than 0");
        if (this.limit && typeof this.limit !== 'number') errors.push("Limit must be a number.");
        if (this.limit && this.limit < 0) errors.push("Page must be greater than 0");

        return errors;
    }
}

