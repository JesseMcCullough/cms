class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);

        this.statusCode = statusCode;
    }

    static notFound(message) {
        return new AppError(message, 404);
    }

    static badRequest(message) {
        return new AppError(message, 400);
    }

    static conflict(message) {
        return new AppError(message, 409);
    }
}

export default AppError;
