import { useProject } from "../hooks/useProject";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ImageGallery from "../components/ImageGallery";

const ProjectPage = () => {
    const { loading, error, fetchProjectWithImages } = useProject();
    const [projectData, setProjectData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeGallery, setActiveGallery] = useState(false);
    const [activeImages, setActiveImages] = useState(null);

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
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Gallery Modal */}
            {activeGallery && activeImages && (
                <ImageGallery
                    images={activeImages.map((img) => img.secure_url)}
                    initialIndex={0}
                    onClose={() => setActiveGallery(false)}
                />
            )}

            <Navbar />

            <div className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-8 w-full">
                <h1 className="text-4xl font-bold text-center pb-10">
                    Project Gallery
                </h1>

                <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectData.map((project) => (
                        <div
                            key={project.project_id}
                            className="bg-white rounded-lg shadow-md overflow-hidden h-72 relative cursor-pointer transition-transform hover:scale-105"
                            onClick={() => {
                                setActiveImages(project.images);
                                setActiveGallery(true);
                            }}
                        >
                            {project.images.length > 0 ? (
                                <img
                                    src={project.images[0].secure_url}
                                    alt={project.project_name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <p className="text-gray-500">No image</p>
                                </div>
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                <p className="text-white font-bold text-xl p-4">
                                    {project.project_name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectPage;
