const TYPES = {
    string: {
        allowed: ["required", "default", "minLength", "maxLength"],
        validators: {
            required: (value, fieldName) => {
                if (typeof value !== "boolean") {
                    throw new Error(`${fieldName}.required must be a boolean`);
                }
            },
            default: (value, fieldName) => {
                if (typeof value !== "string") {
                    throw new Error(`${fieldName}.default must be a string`);
                }
            },
            minLength: (value, fieldName) => {
                if (typeof value !== "number") {
                    throw new Error(`${fieldName}.minLength must be a number`);
                }

                if (value < 0) {
                    throw new Error(`${fieldName}.minLength must be >= 0`);
                }
            },
            maxLength: (value, fieldName) => {
                if (typeof value !== "number") {
                    throw new Error(`${fieldName}.maxLength must be a number`);
                }

                if (value < 0) {
                    throw new Error(`${fieldName}.maxLength must be >= 0`);
                }
            },
        }, // TO-DO: crossValidators, so that minLength isn't more than maxLength
    },
    number: {
        allowed: ["required", "default", "min", "max"],
        validators: {
            required: (value, fieldName) => {
                if (typeof value !== "boolean") {
                    throw new Error(`${fieldName}.required must be a boolean`);
                }
            },
            default: (value, fieldName) => {
                if (typeof value !== "number") {
                    throw new Error(`${fieldName}.default must be a number`);
                }
            },
            min: (value, fieldName) => {
                if (typeof value !== "number") {
                    throw new Error(`${fieldName}.min must be a number`);
                }
            },
            max: (value, fieldName) => {
                if (typeof value !== "number") {
                    throw new Error(`${fieldName}.max must be a number`);
                }
            },
        },
    },
    boolean: {
        allowed: ["required", "default"],
        validators: {
            required: (value, fieldName) => {
                if (typeof value !== "boolean") {
                    throw new Error(`${fieldName}.required must be a boolean`);
                }
            },
            default: (value, fieldName) => {
                if (typeof value !== "boolean") {
                    throw new Error(`${fieldName}.default must be a boolean`);
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
        throw new Error("Schema must be an object");
    }

    for (const [fieldName, field] of Object.entries(schema)) {
        if (!field || typeof field !== "object") {
            throw new Error(`${fieldName} must be an object`);
        }

        const type = TYPES[field.type];

        if (!type) {
            throw new Error(`Unknown type: ${field.type}`);
        }

        for (const [property, value] of Object.entries(field)) {
            // type already checked
            if (property === "type") {
                continue;
            }

            // property doesn't exist
            if (!type.allowed.includes(property)) {
                throw new Error(
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
