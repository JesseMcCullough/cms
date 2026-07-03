import { useState, useEffect } from "react";

export default function ViewPages() {
    const [pages, setPages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/pages")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch pages");
                }

                return res.json();
            })
            .then((data) => setPages(data))
            .catch((err) => setError(err.message));
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            {pages.map((page) => (
                <p key={page.id}>
                    {page.title} (/{page.slug})
                </p>
            ))}
        </div>
    );
}
