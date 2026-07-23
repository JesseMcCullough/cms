import { Routes, Route, Link } from "react-router";
import CreatePage from "@/CreatePage";
import ViewPages from "@/ViewPages";
import EditPage from "@/EditPage";
import DeletePage from "@/DeletePage";

export default function App() {
    return (
        <>
            <h1>CMS</h1>
            <Link to="/pages/create">Create Page</Link>
            <Link to="/pages">View Pages</Link>

            <Routes>
                <Route path="/pages/create" element={<CreatePage />} />
                <Route path="/pages" element={<ViewPages />} />
                <Route path="/pages/edit/:id" element={<EditPage />} />
                <Route path="/pages/delete/:id" element={<DeletePage />} />
            </Routes>
        </>
    );
}
