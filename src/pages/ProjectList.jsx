import { useState } from "react"
import projectApi from "../services/projectApi.js"
import ProjectCard from "../components/ProjectCard.jsx"
import ProjectForm from "../components/ProjectForm.jsx"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from 'lucide-react';

export default function ProjectList() {
    const {
        data: projects,
        isLoading,
        isFetching,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ["projects"],
        queryFn: ({ signal }) => projectApi.getAllProjects(signal)
    })

    const [isFormOpen, setIsFormOpen] = useState({ state: false, id: "" })

    if (isLoading || isFetching) {
        return (
            <div className="h-full flex flex-col gap-4 dark:bg-slate-900">
                <div className="bg-gray-300 py-4">
                    <h1 className="text-center font-bold text-blue-500 font-times">Tổng quan hệ thống</h1>
                </div>

                <div className="flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity flex-1">
                    <div className="flex flex-col items-center gap-3 rounded-2xl bg-white/90 p-6 shadow-xl dark:bg-zinc-900/90 dark:text-white">
                        <Loader2 className="h-10 w-10 animate-spin text-indigo-600 dark:text-indigo-400" />
                        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Đang tải dữ liệu...
                        </p>
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div className="flex flex-col h-full dark:bg-slate-900">
            <div className="bg-gray-300 py-4 text-center font-bold text-blue-500 font-times dark:bg-blue-300 dark:text-slate-700">
                <h1 className="">Danh sách dự án</h1>
            </div>

            <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                <div className="flex justify-end gap-2">
                    <button
                        className="bg-blue-400 text-white border border-blue-300 rounded p-2 hover:bg-blue-600"
                        onClick={() => refetch()}
                    >
                        {isFetching ? "Đang tải..." : "Tải lại"}
                    </button>
                    {!isFormOpen.state && (
                        <button
                            className="bg-green-400 text-white border border-blue-300 rounded p-2 hover:bg-green-600"
                            onClick={() => setIsFormOpen({ state: true, id: "" })}
                        >
                            Thêm dự án
                        </button>
                    )}
                    
                </div>

                {isFormOpen.state && (
                    <ProjectForm
                        key={isFormOpen.id || "new"}
                        initialData={isFormOpen.id ? projects.find((p) => p.id === isFormOpen.id) : null}
                        onClose={() => setIsFormOpen({ state: false, id: "" })}
                    />
                )}

                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-2 p-2 border-2 border-gray-300 rounded">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onEdit={() => setIsFormOpen({ state: true, id: project.id })}
                                editDisabled={isFormOpen.state}
                                deleteDisabled={isFormOpen.state && isFormOpen.id === project.id}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-xl text-gray-500 dark:text-blue-500">
                        Không có dự án nào. Vui lòng nhấn nút "Thêm dự án" để tạo dự án mới.
                    </p>
                )}

                
            </div>
        </div>
    )
}