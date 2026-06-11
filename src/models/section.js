import database from "#database";

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
            throw new Error("DUPLICATE_NAME");
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
        throw new Error("NO_FIELDS_PROVIDED");
    }

    values.push(id);

    const statement = database.prepare(`
        UPDATE sections
        SET ${updates.join(", ")}
        WHERE id = ?
    `);

    const result = statement.run(...values);

    if (result.changes === 0) {
        throw new Error("SECTION_NOT_FOUND");
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
        throw new Error("SECTION_NOT_FOUND");
    }

    // remove page_sections relationships

    return {
        success: true,
    };
}
