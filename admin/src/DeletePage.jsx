import { useParams, useLocation } from "react-router";
import { useState } from "react";

export default function DeletePage() {
    const { id } = useParams();
    const { state } = useLocation();
    const [errors, setErrors] = useState({});
    const [isDeleted, setIsDeleted] = useState(false);
    const title = state?.title;

    async function handleClick(e) {
        e.preventDefault();

        try {
            const res = await fetch(`/api/pages/${id}`, {
                method: "DELETE",
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

            setIsDeleted(true);
        } catch (err) {
            setErrors({ general: "Network error. Please try again" });
        }
    }

    if (errors.system) {
        return <p>{errors.system}</p>;
    }

    return (
        <>
            <h1>Delete</h1>
            {errors.general && <p>{errors.general}</p>}
            {!isDeleted && (
                <>
                    <p>
                        Are you sure you want to delete {title ?? "this page"}?
                    </p>
                    <button type="button" onClick={handleClick}>
                        Yes
                    </button>
                </>
            )}
            {isDeleted && <p>{title ?? "this page"} has been deleted.</p>}
        </>
    );
}
