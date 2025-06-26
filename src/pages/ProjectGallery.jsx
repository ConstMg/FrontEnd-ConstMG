import { useProject } from "../hooks/useProject";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ImageGallery from "../components/ImageGallery";
import { p } from "framer-motion/client";
import { FlipCard } from "../components/FlipCard";
import { useNavigate } from "react-router-dom";

const ProjectPage = () => {
    const { loading, error, fetchProjectWithImages } = useProject();
    const [projectData, setProjectData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeGallery, setActiveGallery] = useState(false);
    const [activeImages, setActiveImages] = useState(null);
    const [activeProject, setActiveProject] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const loadProjectData = async () => {
            setIsLoading(true);
            try {
                const data = await fetchProjectWithImages();
                setProjectData(data);
            } catch (err) {
                console.error("Error fetching Project data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadProjectData();
    }, [fetchProjectWithImages]);

    if (loading || isLoading)
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-8 w-full">
                <h1 className="text-4xl font-bold text-center pb-10">
                    Project Gallery
                </h1>

                <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectData.map((project) => (
                        <div key={project.project_id}>
                            <FlipCard
                                imageUrl={project.images?.[0]?.secure_url || ""}
                                description={
                                    project.deskripsi || "Tidak ada deskripsi"
                                }
                                title={
                                    project.project_name || "Proyek Tanpa Nama"
                                }
                                onClick={() => {
                                    const projectSlug = (
                                        project.project_name || ""
                                    )
                                        .trim()
                                        .replace(/\s+/g, "_")
                                        .toLowerCase();

                                    navigate(`/project/${projectSlug}`);
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectPage;
