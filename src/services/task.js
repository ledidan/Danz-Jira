import axiosClient from "./axiosClient";

class TaskService {
  updateTaskStatus(taskId, statusId) {
    return axiosClient.put("/api/Project/updateStatus", { taskId, statusId });
  }

  createTask(data) {
    return axiosClient.post("/api/Project/createTask", data);
  }

  fetchAllTaskTypes() {
    return axiosClient.get("/api/TaskType/getAll");
  }

  fetchTaskDetail(taskId) {
    return axiosClient.get("/api/Project/getTaskDetail", {
      params: { taskId },
    });
  }

  updateTask(data) {
    return axiosClient.post("/api/Project/updateTask", data);
  }
}

export default TaskService;
