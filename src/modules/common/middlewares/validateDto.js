import { DTO_SOURCE_BODY, DTO_SOURCE_PARAMS, DTO_SOURCE_QUERY } from "../../../constants/constants.js";

export function ValidateDto(DtoClass, source, params = []) {
    return (req, res, next) => {
        let dtoValues = {};

        if (source === DTO_SOURCE_PARAMS) {
            for (const param of params) {
                dtoValues[param] = req.params[param] ?? null;
            }
        } else if (source === DTO_SOURCE_QUERY) {
            for (const param of params) {
                dtoValues[param] = req.query[param] ?? null;
            }
        } else {
            dtoValues = req.body;
        }

        const dto = new DtoClass(dtoValues);
        const errors = typeof dto.validate === 'function' ? dto.validate() : [];

        if (errors.length > 0) {
            return res.status(400).json({ message: "Validation failed", errors });
        }

        req.validated = { ...req.validate, ...dto }
        next();
    };
}
