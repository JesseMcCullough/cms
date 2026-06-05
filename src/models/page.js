import database from "#database";

export function createPage(title, slug) {
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
