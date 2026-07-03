import { Routes, Route, Link } from "react-router";
import CreatePage from "@/CreatePage";
import ViewPages from "@/ViewPages";

export default function App() {
    return (
        <>
            <h1>CMS</h1>
            <Link to="/pages/create">Create Page</Link>
            <Link to="/pages">View Pages</Link>

            <Routes>
                <Route path="/pages/create" element={<CreatePage />} />
                <Route path="/pages" element={<ViewPages />} />
            </Routes>
        </>
    );
}
