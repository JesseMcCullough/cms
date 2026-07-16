import database from "#database";
import AppError from "#apperror";
import { validateContent } from "#validators/contentValidator";
import { getFields } from "#models/section";

export function getAll() {
    const select = database.prepare("SELECT * FROM pages");

    return select.all();
}

export function get(id) {
    const statement = database.prepare("SELECT * FROM pages WHERE id = ?");
    const result = statement.get(id);

    if (!result) {
        throw AppError.notFound("Page not found");
    }

    return result;
}

export function create(title, slug) {
    const insert = database.prepare(
        "INSERT INTO pages (title, slug) VALUES (?, ?)",
    );

    try {
        insert.run(title, slug);
    } catch (err) {
        if (err.errcode === 2067) {
            throw AppError.conflict(`Slug already exists`);
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
        throw AppError.badRequest("No fields provided");
    }

    values.push(id);

    const statement = database.prepare(`
        UPDATE pages
        SET ${updates.join(", ")}
        WHERE id = ?
    `);

    const result = statement.run(...values);

    if (result.changes === 0) {
        throw AppError.notFound("Page not found");
    }

    return {
        success: true,
    };
}

export function remove(id) {
    const statement = database.prepare("DELETE FROM pages WHERE id = ?");
    const result = statement.run(id);

    if (result.changes === 0) {
        throw AppError.notFound("Page not found");
    }

    return {
        success: true,
    };
}

export function addSection(id, sectionId, content) {
    if (typeof content !== "object") {
        throw AppError.badRequest("'content' must be an object");
    }

    const sectionSchema = getFields(sectionId);

    validateContent(content, sectionSchema);

    const statement = database.prepare(
        "INSERT INTO page_sections (page_id, section_id, content) VALUES (?, ?, ?)",
    );

    try {
        statement.run(id, sectionId, JSON.stringify(content));
    } catch (err) {
        if (err.errcode === 787) {
            throw AppError.notFound("pageId or sectionId not found");
        }

        throw err;
    }

    return {
        success: true,
    };
}

/**
 * entire content schema needs to be provided
 */
export function updateSection(pageSectionId, content) {
    if (typeof content !== "object") {
        throw AppError.badRequest("'content' must be an object");
    }

    const sectionIdStatement = database.prepare(
        "SELECT section_id FROM page_sections WHERE id = ?",
    );
    const sectionId = sectionIdStatement.get(pageSectionId)?.section_id;

    if (!sectionId) {
        throw AppError.notFound("pageSectionId not found");
    }

    const sectionSchema = getFields(sectionId);

    validateContent(content, sectionSchema);

    const statement = database.prepare(
        "UPDATE page_sections SET content = ? WHERE id = ?",
    );
    const result = statement.run(JSON.stringify(content), pageSectionId);

    if (result.changes === 0) {
        throw AppError.notFound("pageSectionId not found");
    }

    return {
        success: true,
    };
}

export function removeSection(pageSectionId) {
    const statement = database.prepare(
        "DELETE FROM page_sections WHERE id = ?",
    );
    const result = statement.run(pageSectionId);

    if (result.changes === 0) {
        throw AppError.notFound("Page section not found");
    }

    return {
        success: true,
    };
}
