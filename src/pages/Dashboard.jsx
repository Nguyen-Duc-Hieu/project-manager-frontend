import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import taskApi from '../services/taskApi.js';
import projectApi from '../services/projectApi.js';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';

export default function Dashboard() {
  const { 
    data: projects,
    isLoading: isProjectsLoading,
    isFetching: isProjectsFetching,
    isError: isProjectsError,
    error: projectsError
  } = useQuery({
    queryKey: ['projects'],
    queryFn: ({ signal }) => projectApi.getAllProjects(signal),
  });

  const {
    data: tasks, 
    isLoading: isTasksLoading,
    isFetching: isTasksFetching,
    isError: isTasksError,
    error: tasksError
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: ({ signal }) => taskApi.getAllTasks(signal),
  });


  if (isProjectsLoading || isTasksLoading) {
    return (
      <div className="h-full flex flex-col gap-4">
        <div className="bg-gray-300 py-4">
            <h1 className="text-center font-bold text-blue-500 font-times">Tổng quan hệ thống</h1>
        </div>

        <div className="flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity flex-1">
          <div className="flex flex-col items-center gap-3 rounded-2xl bg-white/90 p-6 shadow-xl dark:bg-zinc-900/90 dark:text-white">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-600 dark:text-indigo-400" />
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Đang tải dữ liệu lần đầu...
            </p>
          </div>
        </div>

      </div>
    );
  }

  if (isProjectsFetching || isTasksFetching) {
    return (
      <div className="h-full flex flex-col gap-4">
        <div className="bg-gray-300 py-4">
            <h1 className="text-center font-bold text-blue-500 font-times">Tổng quan hệ thống</h1>
        </div>

        <div className="flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity flex-1">
          <div className="flex flex-col items-center gap-3 rounded-2xl bg-white/90 p-6 shadow-xl dark:bg-zinc-900/90 dark:text-white">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-600 dark:text-indigo-400" />
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Dữ liệu đang được cập nhật...
            </p>
          </div>
        </div>

      </div>
    );
  }



  const completedTasks = tasks.filter((t) => t.status === 'done').length;
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
  const calculateProjectProgress = (projectId) => {
  const projectTasks = tasks.filter(t => t.projectId === projectId);
    if (projectTasks.length === 0) return 0;
    
    const completedTasks = projectTasks.filter(t => t.status === 'done').length;
    return Math.round((completedTasks / projectTasks.length) * 100);
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="bg-gray-300 py-4">
          <h1 className="text-center font-bold text-blue-500 font-times">Tổng quan hệ thống</h1>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto p-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md">
            <p className="text-sm font-medium text-gray-500">Tổng số dự án</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{projects.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md">
            <p className="text-sm font-medium text-gray-500">Tổng số task</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{tasks.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md">
            <p className="text-sm font-medium text-gray-500">Tỷ lệ hoàn thành</p>
            <p className="text-3xl font-bold text-emerald-600 mt-2">{completionRate}%</p>
          </div>
        </div>

        {/* TIẾN ĐỘ DỰ ÁN (PROGRESS BAR) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-gray-900">Tiến độ dự án</h2>

          <div className="space-y-4">
            {projects.map((project) => {
              const projectTasks = tasks.filter((t) => t.projectId === project.id);
              const progress = calculateProjectProgress(project.id);

              return (
                <div key={project.id} className="space-y-4 p-4 rounded-xl hover:shadow-sm hover:bg-gray-50">
                  <div className="flex justify-between text-sm">
                    <Link to={`/projects/${project.id}`} className="font-semibold text-gray-800 hover:text-blue-600">
                      {project.name}
                    </Link>
                    <span className="text-gray-500 font-medium">
                      {progress}% ({projectTasks.filter((t) => t.status === 'done').length}/{projectTasks.length} tasks)
                    </span>
                  </div>

                  {/* Thanh Progress Bar Tailwind */}
                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <motion.div
                      className="bg-green-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    >
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}