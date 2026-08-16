import axiosClient from './axiosClient.js'
import taskApi from './taskApi.js'

const projectApi = {
    getAllProjects(abortSignal) {
        return axiosClient.get('/projects', { signal: abortSignal })
    },
    
    addProject(data) {
        return axiosClient.post("/projects", data)
    },

    deleteProject: async (projectId) => {
        const tasks = await taskApi.getProjectTasks(projectId)

        // Xóa tất cả các task thuộc dự án
        await Promise.all(tasks.map((task) => taskApi.deleteTask(task.id)))
        return axiosClient.delete(`/projects/${projectId}`)
        
    },

    updateProject(projectId, data) {
        return axiosClient.patch(`/projects/${projectId}`, data)
    }
}

export default projectApi