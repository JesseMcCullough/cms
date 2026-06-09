import database from "#database";

export function create(title, slug) {
    const insert = database.prepare(
        "INSERT INTO pages (title, slug) VALUES (?, ?)",
    );

    try {
        insert.run(title, slug);
    } catch (err) {
        if (err.errcode === 2067) {
            throw new Error("DUPLICATE_SLUG");
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

    if (data.title !== undefined) {
        updates.push("title = ?");
        values.push(data.title);
    }

    if (data.slug !== undefined) {
        updates.push("slug = ?");
        values.push(data.slug);
    }

    if (updates.length === 0) {
        throw new Error("NO_FIELDS_PROVIDED");
    }

    values.push(id);

    const statement = database.prepare(`
        UPDATE pages
        SET ${updates.join(", ")}
        WHERE id = ?
    `);

    const result = statement.run(...values);

    if (result.changes === 0) {
        throw new Error("PAGE_NOT_FOUND");
    }

    return {
        success: true,
    };
}

export function remove(id) {
    const statement = database.prepare("DELETE FROM pages WHERE id = ?");
    const result = statement.run(id);

    if (result.changes === 0) {
        throw new Error("PAGE_NOT_FOUND");
    }

    return {
        success: true,
    };
}
