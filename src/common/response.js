export const successResponse = (req, res, message = '', data, statusCode = 200) => {
    res.status(statusCode).json({
        status: statusCode,
        error: false,
        message,
        data,
    });
};

export const errorResponse = (req, res, message = '', statusCode = 500) => {
    res.status(statusCode).json({
        status: statusCode,
        error: true,
        message,
    });
};