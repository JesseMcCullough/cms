import { useState, useEffect } from "react";

/*
 * maybe get list of slugs so that real-time unique slug checking can be done.
 */
export default function PageForm({ id, submitLabel = "Submit" }) {
    const [formData, setFormData] = useState({ title: "", slug: "" });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!id) {
            return;
        }

        const fetchPage = async () => {
            try {
                const res = await fetch(`/api/pages/${id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!res.ok) {
                    if (res.status === 404) {
                        setErrors({ system: "Page not found" });
                        return;
                    }

                    const errorData = await res.json();

                    if (errorData.error) {
                        setErrors({ general: errorData.error });
                    }

                    return;
                }

                const data = await res.json();
                setFormData({ title: data.title, slug: data.slug });
            } catch (err) {
                setErrors({ general: "Network error. Please try again" });
            }
        };

        fetchPage();
    }, [id]);

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
            let endpoint = "/api/pages";
            let method = "POST";

            if (id) {
                endpoint += `/${id}`;
                method = "PATCH";
            }

            const res = await fetch(endpoint, {
                method,
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

    if (errors.system) {
        return <p>{errors.system}</p>;
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

            <button type="submit">{submitLabel}</button>
        </form>
    );
}
