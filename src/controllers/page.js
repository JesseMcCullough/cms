import * as pageModel from "#models/page";

// createPage
// deletePage
// updatePage
// getPage
// getPages
export function createPage(req, res) {
    try {
        const { title, slug } = req.body;

        if (!title || !slug) {
            return res
                .status(400)
                .json({ error: "Title and slug are required." });
        }

        const result = pageModel.createPage(title, slug);

        return res.status(201).json({ message: "Page created" });
    } catch (err) {
        if (err.message === "DUPLICATE_SLUG") {
            res.status(409).json({ error: "Slug already exists" });
        }

        console.error(err);

        res.status(500).json({ error: "Server error" });
    }
}
