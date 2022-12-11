import axiosClient from "./axiosClient";
import * as yup from "yup";

export const createTaskSchema = yup.object().shape({
  taskName: yup.string().required("Project name is required"),
  description: yup.string().required("Description is required"),
});

class TaskService {
  updateTaskStatus(taskId, statusId) {
    return axiosClient.put("/project/updateStatus", { taskId, statusId });
  }

  createTask(data) {
    return axiosClient.post("/project/createTask", data);
  }

  fetchAllTaskTypes() {
    return axiosClient.get("/taskType/getAll");
  }

  fetchTaskDetail(taskId) {
    return axiosClient.get("/project/getTaskDetail", {
      params: { taskId },
    });
  }

  updateTask(data) {
    return axiosClient.post("/project/updateTask", data);
  }

  updateDescription(data) {
    return axiosClient.put("/project/updateDescription", data);
  }

  updatePriority(data) {
    return axiosClient.put("/project/updatePriority", data);
  }

  assignUserToTask(data) {
    return axiosClient.post("/project/assignUserTask", data);
  }

  removeUserFromTask(data) {
    return axiosClient.post("/project/removeUserFromTask", data);
  }

  updateEstimate(data) {
    return axiosClient.put("/project/updateEstimate", data);
  }

  updateTimeTracking(data) {
    return axiosClient.put("/project/updateTimeTracking", data);
  }

  removeTask(params) {
    return axiosClient.delete("/project/removeTask", { params });
  }
}

export default TaskService;
