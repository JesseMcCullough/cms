import * as sectionModel from "#models/section";

export function create(req, res) {
    try {
        const data = req.body;

        if (!data || !data.name || !data.title || !data.fields) {
            return res
                .status(400)
                .json({ error: "Name, title, and fields are required" });
        }

        sectionModel.create(data.name, data.title, data.fields);

        return res.status(201).json({ message: "Section created" });
    } catch (err) {
        if (err.message === "DUPLICATE_NAME") {
            return res.status(409).json({ error: "Section already exists" });
        }

        console.error(err);

        return res.status(500).json({ error: "Server error" });
    }
}

// check if updated name conflicts with an existing name.
export function update(req, res) {
    try {
        const id = Number(req.params.id);
        const data = req.body;

        if (!id || !Number.isInteger(id) || id < 1) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        if (!data || (!data.name && !data.title && !data.fields)) {
            return res
                .status(400)
                .json({ error: "Name, title, or fields is required." });
        }

        sectionModel.update(id, data);

        return res.status(200).json({ message: "Section updated" });
    } catch (err) {
        if (err.message === "SECTION_NOT_FOUND") {
            return res.status(404).json({ error: "Section not found" });
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

        sectionModel.remove(id);

        return res.status(204).send();
    } catch (err) {
        if (err.message === "SECTION_NOT_FOUND") {
            return res.status(404).json({ error: "Section not found" });
        }

        console.error(err);

        return res.status(500).json({ error: "Server error" });
    }
}
