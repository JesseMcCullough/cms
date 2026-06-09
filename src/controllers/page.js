import * as pageModel from "#models/page";

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
        if (err.message === "DUPLICATE_SLUG") {
            return res.status(409).json({ error: "Slug already exists" });
        }

        console.error(err);

        return res.status(500).json({ error: "Server error" });
    }
}

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
        if (err.message === "PAGE_NOT_FOUND") {
            return res.status(404).json({ error: "Page not found" });
        }

        console.error(err);

        return res.status(500).json({ error: "Server error" });
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
        if (err.message === "PAGE_NOT_FOUND") {
            return res.status(404).json({ error: "Page not found" });
        }

        console.error(err);

        return res.status(500).json({ error: "Server error" });
    }
}
