import database from "#database";
import AppError from "#apperror";

// probably need to do some kind of stringify thingy with the fields

export function create(name, title, fields) {
    const insert = database.prepare(
        "INSERT INTO sections (name, title, fields) VALUES (?, ?, ?)",
    );

    try {
        console.log(name, title, fields);
        insert.run(name, title, fields);
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
        updates.push("name = ?");
        values.push(data.name);
    }

    if (data.title !== undefined) {
        updates.push("title = ?");
        values.push(data.title);
    }

    if (data.fields !== undefined) {
        updates.push("fields = ?");
        values.push(data.fields);
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

    // remove page_sections relationships

    return {
        success: true,
    };
}
