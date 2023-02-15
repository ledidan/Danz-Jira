import { userService } from "../../services";
import { createAction } from ".";
import { actionType } from "./type";
import { notifitying } from "../../utils/notification";

export const fetchAllUsers = (params) => {
  return async (dispatch) => {
    try {
      const res = await userService.fetchAllUsers(params);

      dispatch(createAction(actionType.SET_USER_LIST, res.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      await userService.deleterUser(id);

      dispatch(fetchAllUsers());

      notifitying("success", "User successfully deleted");
    } catch (err) {
      console.log(err);
      notifitying("warning", "User failed to be deleted");
    }
  };
};

// export const getMembersByProjectId = (id) => {
//   return async (dispatch) => {
//     try {
//       const res = await userService.getMembersByProjectId(id);

//       dispatch(createAction(actionType.GET_PROJECT_MEMBERS, res.data.content));
//     } catch (err) {
//       dispatch(createAction(actionType.GET_PROJECT_MEMBERS, []));
//       console.log(err);
//       throw new Error("Failed to fetch project members");
//     }
//   };
// };
// Create a cache object to store the fetched data

export const getMembersByProjectId = (id) => {
  const memberCache = {};
  return async (dispatch) => {
    try {
      let res;
      // Check if the data is already in the cache
      if (memberCache[id]) {
        res = memberCache[id];
      } else {
        // Fetch the data from the server
        res = await userService.getMembersByProjectId(id);
        // Cache the data
        memberCache[id] = res;
      }

      dispatch(createAction(actionType.GET_PROJECT_MEMBERS, res.data.content));
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch project members");
    }
  };
};

export const updateUser = (data, callback) => {
  return async () => {
    try {
      userService.updateUser(data);

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};
