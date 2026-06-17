import * as pageModel from "#models/page";
import AppError from "#apperror";

export function create(req, res) {
    try {
        const data = req.body;

        if (!data || !data.title || !data.slug) {
            return res
                .status(400)
                .json({ error: "Title and slug are required" });
        }

        pageModel.create(data.title, data.slug);

        return res.status(201).json({ message: "Page created" });
    } catch (err) {
        handleError(err, res);
    }
}

// check if updated slug conflicts with an existing slug.
export function update(req, res) {
    try {
        const id = Number(req.params.id);
        const data = req.body;

        if (!id || !Number.isInteger(id) || id < 1) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        if (!data || (!data.title && !data.slug)) {
            return res
                .status(400)
                .json({ error: "Title or slug is required." });
        }

        pageModel.update(id, data);

        return res.status(200).json({ message: "Page updated" });
    } catch (err) {
        handleError(err, res);
    }
}

export function remove(req, res) {
    try {
        const id = Number(req.params.id);

        if (!id || !Number.isInteger(id) || id < 1) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        pageModel.remove(id);

        return res.status(204).send();
    } catch (err) {
        handleError(err, res);
    }
}

export function addSection(req, res) {
    try {
        const id = Number(req.params.id);

        if (!id || !Number.isInteger(id) || id < 1) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        const data = req.body;

        if (!data || !data.sectionId || !data.content) {
            return res
                .status(400)
                .json({ error: "ID, sectionId, and content are required" });
        }

        pageModel.addSection(id, data.sectionId, data.content);

        return res.status(201).json({ message: "Page added section" });
    } catch (err) {
        handleError(err, res);
    }
}

function handleError(err, res) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    console.error(err);

    return res.status(500).json({ error: "Server error" });
}
