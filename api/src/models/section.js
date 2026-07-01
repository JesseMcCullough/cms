import database from "#database";
import AppError from "#apperror";
import { validateSchema } from "#validators/schemaValidator";

// probably need to do some kind of stringify thingy with the fields

export function create(name, title, fields) {
    /**
     * {
     *      "title": "",
     *      "name": "",
     *      "fields": {
     *          "something": {
     *              type: "string"
     *          },
     *      },
     * }
     */

    if (typeof name !== "string" || !name.trim()) {
        throw AppError.badRequest("'name' is required'");
    }

    if (typeof title !== "string" || !title.trim()) {
        throw AppError.badRequest("'title' is required'");
    }

    if (typeof fields !== "object") {
        throw AppError.badRequest("'fields' is required'");
    }

    validateSchema(fields);

    const insert = database.prepare(
        "INSERT INTO sections (name, title, fields) VALUES (?, ?, ?)",
    );

    try {
        console.log(name, title, fields);
        insert.run(name, title, JSON.stringify(fields));
    } catch (err) {
        if (err.errcode === 2067) {
            throw AppError.conflict("Section name already exists");
        }

        throw err;
    }

    return {
        success: true,
    };
}

export function update(id, data) {
    const updates = [];
    const values = [];

    if (data.name !== undefined) {
        if (typeof data.name !== "string" || !data.name.trim()) {
            throw AppError.badRequest("'name' must be a string'");
        }

        updates.push("name = ?");
        values.push(data.name);
    }

    if (data.title !== undefined) {
        if (typeof data.title !== "string" || !data.title.trim()) {
            throw AppError.badRequest("'title' must be a string'");
        }

        updates.push("title = ?");
        values.push(data.title);
    }

    if (data.fields !== undefined) {
        if (typeof data.fields !== "object") {
            throw AppError.badRequest("'fields' must be an object'");
        }

        validateSchema(data.fields);

        updates.push("fields = ?");
        values.push(JSON.stringify(data.fields));
    }

    if (updates.length === 0) {
        throw AppError.badRequest("No fields provided");
    }

    values.push(id);

    const statement = database.prepare(`
        UPDATE sections
        SET ${updates.join(", ")}
        WHERE id = ?
    `);

    const result = statement.run(...values);

    if (result.changes === 0) {
        throw AppError.notFound("Section not found");
    }

    // update page_sections relationships

    return {
        success: true,
    };
}

export function remove(id) {
    const statement = database.prepare("DELETE FROM sections WHERE id = ?");
    const result = statement.run(id);

    if (result.changes === 0) {
        throw AppError.notFound("Section not found");
    }

    return {
        success: true,
    };
}

export function getFields(id) {
    const statement = database.prepare(
        "SELECT fields FROM sections WHERE id = ?",
    );
    const fields = statement.get(id);

    if (!fields) {
        throw AppError.notFound("Section not found");
    }

    return JSON.parse(fields.fields);
}
