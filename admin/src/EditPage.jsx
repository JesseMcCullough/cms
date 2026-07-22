import { useParams } from "react-router";
import PageForm from "@/PageForm";

export default function EditPage() {
    const { id } = useParams();

    return (
        <>
            <h1>Edit</h1>
            <PageForm id={id} submitLabel="Edit Page" />
        </>
    );
}
