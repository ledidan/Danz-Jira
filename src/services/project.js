import axiosClient from "./axiosClient";
import * as yup from "yup";

export const createProjectSchema = yup.object().shape({
  projectName: yup.string().required("Project name is required"),
  categoryId: yup
    .number()
    .required("Project category is required")
    .min(1, "Project category is required")
    .max(3, "Project category is required"),
});

class ProjectService {
  fetchAllProjects(params) {
    return axiosClient.get("/project/getAllProject", { params });
  }

  fetchAllProjectCategories() {
    return axiosClient.get("/projectCategory");
  }

  createProjectAuthorize(data) {
    return axiosClient.post("/project/createProjectAuthorize", data);
  }

  updateProject(data) {
    return axiosClient.put(`/project/updateProject?projectId=${data.id}`, data);
  }

  fetchUsersByProject(projectId) {
    return axiosClient.get("/users/getUserByProjectId", {
      params: { idProject: projectId },
    });
  }

  assignUserToProject(data) {
    return axiosClient.post("/project/assignUserProject", data);
  }

  removeUserFromProject(data) {
    return axiosClient.post("/project/removeUserFromProject", data);
  }

  deleteProject(projectId) {
    return axiosClient.delete("/project/deleteProject", {
      params: {
        projectId,
      },
    });
  }

  fetchProjectDetail(projectId) {
    return axiosClient.get("/project/getProjectDetail", {
      params: { id: projectId },
    });
  }
}

export default ProjectService;
