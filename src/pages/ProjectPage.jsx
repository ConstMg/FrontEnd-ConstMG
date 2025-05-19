import { useProject } from "../hooks/useProject";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ImageCard from "../components/ImageCard";
import ImageGallery from "../components/ImageGallery"; // Add this import

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
        <div className="bg-gray-100 min-h-screen pt-11">
            {/* Gallery Modal */}
            {activeGallery && activeImages && (
                <ImageGallery
                    images={activeImages.map((img) => img.secure_url)}
                    initialIndex={0}
                    onClose={() => setActiveGallery(false)}
                />
            )}

            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Project Gallery
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                    {projectData.map((project) => (
                        <div
                            key={project.project_id}
                            className="bg-white rounded-lg shadow-md overflow-hidden h-64 relative cursor-pointer"
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

                            {/* Project name overlay */}
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
