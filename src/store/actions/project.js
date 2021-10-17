import { projectService } from "../../services";
import { createAction } from ".";
import { actionType } from "./type";

export const fetchAllProjects = (params) => {
  return async (dispatch) => {
    try {
      const res = await projectService.fetchAllProjects(params);

      dispatch(createAction(actionType.SET_PROJECT_LIST, res.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteProject = (projectId, callback) => {
  return async (dispatch) => {
    try {
      await projectService.deleteProject(projectId);

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log({...err});
    }
  };
};
