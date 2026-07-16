import { useParams } from "react-router";
import { useState, useEffect } from "react";
import PageForm from "@/PageForm";

export default function EditPage() {
    const { id } = useParams();
    const [pageData, setPageData] = useState({ title: "", slug: "" });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const res = await fetch(`/api/pages/${id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!res.ok) {
                    const errorData = await res.json();

                    if (errorData.error) {
                        setErrors({ general: errorData.error });
                    }

                    return;
                }

                const data = await res.json();
                setPageData({ title: data.title, slug: data.slug });
                console.log(data.title, data.slug);
            } catch (err) {
                setErrors({ general: "Network error. Please try again" });
            }
        };

        fetchPage();
    }, [id]);

    return (
        <>
            <h1>Edit</h1>
            <PageForm title={pageData.title} slug={pageData.slug} />;
        </>
    );
}
