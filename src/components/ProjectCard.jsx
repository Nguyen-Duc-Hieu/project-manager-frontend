import formatTimestamp from "../helper/formatTimestamp.js";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import projectApi from "../services/projectApi.js";
import StarRating from "./StarRating.jsx";

function ProjectCard({ project, onEdit, editDisabled, deleteDisabled }) {

    const { id, name, description, isAccepted, createdAt, lastModified } = project;

    const queryClient = useQueryClient();
    const {
        mutate,
        isPending
    } = useMutation({
        mutationFn: () => projectApi.deleteProject(id),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["projects"] });

            const previousProjects = queryClient.getQueryData(["projects"]) || [];
            queryClient.setQueryData(["projects"], (oldProjects) => {
                return oldProjects.filter((p) => p.id !== id);
            });

            return { previousProjects };

        },
        onError: (error, variables, context) => {
            console.error("Request xóa dự án thất bại:", error.message);

            queryClient.setQueryData(
                ["projects"],
                context.previousProjects
            )
        },
        onSettled: () => {
            return queryClient.invalidateQueries({ queryKey: ["projects"] });
        }

    })

    return (
        <div
            className={`
                flex flex-col p-4 rounded border-2 shadow-sm
                ${isAccepted ? "border-green-200" : "border-red-200"}
                dark:bg-blue-400 dark:text-white
            `}
        >
            <h3 className="text-center text-xl font-bold mb-2 truncate font-times">
                {name}
            </h3>
            <p className="mb-4 line-clamp-2">
                {description}
            </p>
            <div className="grid grid-cols-1 gap-2">
                <p>Created at: {formatTimestamp(createdAt)}</p>
                <p>Last modified: {formatTimestamp(lastModified)}</p>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div>
                        <StarRating 
                            disabled={true}
                            rating={project.difficulty}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button 
                            className="bg-green-500 text-white border rounded-xl p-2 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={onEdit}
                            disabled={editDisabled}
                        >
                            Sửa
                        </button>
                        <button 
                            className="bg-red-500 text-white border rounded-xl p-2 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={mutate}
                            disabled={deleteDisabled}
                        >
                            Xóa
                        </button>
                        <Link
                            to={`/projects/${id}`}
                            className="bg-blue-500 text-white border rounded-xl p-2 flex items-center hover:bg-blue-700"
                        >
                            Chi tiết
                        </Link>
                    </div>

                </div>
                
            </div>
            
        </div>
    );
}

export default ProjectCard;