import { taskService } from "../../services";
import { createAction } from ".";
import { actionType } from "./type";
import { notifitying } from "../../utils/notification";

export const updateTaskStatus = ({ taskId, statusId }, callback) => {
  return async (dispatch) => {
    try {
      await taskService.updateTaskStatus(taskId, statusId);

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const createTask = (data, callback) => {
  return async (dispatch) => {
    try {
      dispatch(createAction(actionType.SET_TASK_ERROR, null));

      await taskService.createTask(data);

      if (callback) {
        callback();
      }

      notifitying("success", "Task successfully created");
      dispatch(createAction(actionType.HIDE_DRAWER));
    } catch (err) {
      console.log(err);

      if (
        err.response.data.statusCode === 500 &&
        err.response.data.content === "task already exists!"
      ) {
        dispatch(
          createAction(actionType.SET_TASK_ERROR, "Task already exists!")
        );
      }

      if (err.response.data.statusCode === 403) {
        dispatch(
          createAction(actionType.SET_TASK_ERROR, err.response.data.content)
        );
      }
    }
  };
};

export const fetchAllTaskTypes = async (dispatch) => {
  try {
    const res = await taskService.fetchAllTaskTypes();

    dispatch(createAction(actionType.SET_TASK_TYPES, res.data.content));
  } catch (err) {
    console.log(err);
  }
};

export const createTaskForm = (data) => {
  return async (dispatch) => {
    try {
      const res = await taskService.createTask(data);

      console.log(res.data);

      notifitying("success", "Task successfully created");
      dispatch(createAction(actionType.HIDE_DRAWER));
    } catch (err) {
      console.log({ ...err });
      notifitying("warning", "Task failed to be created");
      dispatch(createAction(actionType.HIDE_DRAWER));
    }
  };
};
