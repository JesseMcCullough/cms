import AppError from "#apperror";

const TYPES = {
    string: {
        allowed: ["required", "default", "minLength", "maxLength"],
        validators: {
            required: (value, fieldName) => {
                if (typeof value !== "boolean") {
                    throw AppError.badRequest(
                        `${fieldName}.required must be a boolean`,
                    );
                }
            },
            default: (value, fieldName) => {
                if (typeof value !== "string") {
                    throw AppError.badRequest(
                        `${fieldName}.default must be a string`,
                    );
                }
            },
            minLength: (value, fieldName) => {
                if (typeof value !== "number") {
                    throw AppError.badRequest(
                        `${fieldName}.minLength must be a number`,
                    );
                }

                if (value < 0) {
                    throw AppError.badRequest(
                        `${fieldName}.minLength must be >= 0`,
                    );
                }
            },
            maxLength: (value, fieldName) => {
                if (typeof value !== "number") {
                    throw AppError.badRequest(
                        `${fieldName}.maxLength must be a number`,
                    );
                }

                if (value < 0) {
                    throw AppError.badRequest(
                        `${fieldName}.maxLength must be >= 0`,
                    );
                }
            },
        }, // TO-DO: crossValidators, so that minLength isn't more than maxLength
    },
    number: {
        allowed: ["required", "default", "min", "max"],
        validators: {
            required: (value, fieldName) => {
                if (typeof value !== "boolean") {
                    throw AppError.badRequest(
                        `${fieldName}.required must be a boolean`,
                    );
                }
            },
            default: (value, fieldName) => {
                if (typeof value !== "number") {
                    throw AppError.badRequest(
                        `${fieldName}.default must be a number`,
                    );
                }
            },
            min: (value, fieldName) => {
                if (typeof value !== "number") {
                    throw AppError.badRequest(
                        `${fieldName}.min must be a number`,
                    );
                }
            },
            max: (value, fieldName) => {
                if (typeof value !== "number") {
                    throw AppError.badRequest(
                        `${fieldName}.max must be a number`,
                    );
                }
            },
        },
    },
    boolean: {
        allowed: ["required", "default"],
        validators: {
            required: (value, fieldName) => {
                if (typeof value !== "boolean") {
                    throw AppError.badRequest(
                        `${fieldName}.required must be a boolean`,
                    );
                }
            },
            default: (value, fieldName) => {
                if (typeof value !== "boolean") {
                    throw AppError.badRequest(
                        `${fieldName}.default must be a boolean`,
                    );
                }
            },
        },
    },
};

export function validateSchema(schema) {
    /**
     * fieldName: {
     *      property: value // field
     * }
     */
    if (!schema || typeof schema !== "object") {
        throw AppError.badRequest("Schema must be an object");
    }

    for (const [fieldName, field] of Object.entries(schema)) {
        if (!field || typeof field !== "object") {
            throw AppError.badRequest(`${fieldName} must be an object`);
        }

        const type = TYPES[field.type];

        if (!type) {
            throw AppError.badRequest(`Unknown type: ${field.type}`);
        }

        for (const [property, value] of Object.entries(field)) {
            // type already checked
            if (property === "type") {
                continue;
            }

            // property doesn't exist
            if (!type.allowed.includes(property)) {
                throw AppError.badRequest(
                    `${property} is not valid for type ${field.type}`,
                );
            }

            // property is a validator
            if (type.validators && type.validators[property]) {
                const validator = type.validators[property];

                validator(value, fieldName);
            }
        }
    }

    return true;
}
