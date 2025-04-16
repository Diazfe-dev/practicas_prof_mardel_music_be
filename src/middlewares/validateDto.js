export function validateDto(DtoClass, source, paramValue = "") {

    return (req, res, next) => {
        console.log("token",)
        const raw = source === "params"
            ? req.params[paramValue]
            : req.body;

        const dto = new DtoClass(source === "params" ? { [paramValue]: raw } : raw);

        const errors = typeof dto.validate === "function" ? dto.validate() : [];

        if (errors.length > 0) {
            res.status(400).json({ message: "Validation failed", errors });
            return;
        }

        req.validated = dto;

        next();
    };
}
