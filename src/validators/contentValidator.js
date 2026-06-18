import AppError from "#apperror";

export function validateContent(content, schema) {
    /**
     * content: {
     *      fieldName: value
     * }
     *
     * schema: { // schema for whole section, should get schema for that content field
     *      fieldName: {
     *          property: value
     *      }
     * }
     */
    // loop through content and run against schema, making sure each content field exists
    // needed to check content against fields that aren't defined in the schema
    for (const fieldName of Object.keys(content)) {
        const fieldSchema = schema[fieldName];

        if (!fieldSchema) {
            throw AppError.badRequest(`${fieldName} doesn't exist in schema`);
        }
    }

    for (const fieldName of Object.keys(schema)) {
        const schemaField = schema[fieldName];
        const value = content[fieldName];

        if (schemaField.required && value === undefined) {
            throw AppError.badRequest(`${fieldName} is required`);
        }

        // passed required check and no value, no further checks necessary
        if (value === undefined) {
            continue;
        }

        switch (schemaField.type) {
            case "string":
                if (typeof value !== "string") {
                    throw AppError.badRequest(`${fieldName} must be a string`);
                }

                const minLength = schemaField.minLength;
                if (minLength !== undefined && value.length < minLength) {
                    throw AppError.badRequest(
                        `${fieldName} must be at least ${minLength} characters`,
                    );
                }

                const maxLength = schemaField.maxLength;
                if (maxLength !== undefined && value.length > maxLength) {
                    throw AppError.badRequest(
                        `${fieldName} must be no more than ${maxLength} characters`,
                    );
                }

                break;
            case "boolean":
                if (typeof value !== "boolean") {
                    throw AppError.badRequest(`${fieldName} must be a boolean`);
                }

                break;
            case "number":
                if (typeof value !== "number") {
                    throw AppError.badRequest(`${fieldName} must be a number`);
                }

                const min = schemaField.min;
                if (min !== undefined && value < min) {
                    throw AppError.badRequest(
                        `${fieldName} must be at least ${min}`,
                    );
                }

                const max = schemaField.max;
                if (max !== undefined && value > max) {
                    throw AppError.badRequest(
                        `${fieldName} must be no more than ${max}`,
                    );
                }

                break;
        }
    }
}
