import { useState } from "react";

/*
 * maybe get list of slugs so that real-time unique slug checking can be done.
 */
export default function CreatePage() {
    const [formData, setFormData] = useState({ title: "", slug: "" });
    const [errors, setErrors] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const res = await fetch("/api/pages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorData = await res.json();

                if (errorData.error) {
                    setErrors({ general: errorData.error });
                }

                return;
            }

            setFormData({ title: "", slug: "" });
        } catch (err) {
            setErrors({ general: "Network error. Please try again" });
        }
    }

    function validate() {
        const errors = {};

        if (!formData.title.trim().length) {
            errors.title = "title cannot be empty";
        }

        if (!formData.slug.trim().length) {
            errors.slug = "slug cannot be empty";
        }

        return errors;
    }

    return (
        <form onSubmit={handleSubmit}>
            {errors.general && <p>{errors.general}</p>}
            <div>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={formData.title}
                />
                {errors.title && <p>{errors.title}</p>}
            </div>

            <div>
                <label htmlFor="slug">Slug</label>
                <input
                    type="text"
                    name="slug"
                    onChange={handleChange}
                    value={formData.slug}
                />
                {errors.slug && <p>{errors.slug}</p>}
            </div>

            <button type="submit">Create Page</button>
        </form>
    );
}
