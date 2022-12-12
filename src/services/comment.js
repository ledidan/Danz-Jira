import axiosClient from "./axiosClient";

class CommentService {
  fetchAllComments(params) {
    return axiosClient.get("/comment/getAll", { params });
  }

  insertComment(data) {
    return axiosClient.post("/comment/insertComment", data);
  }

  updateComment(params) {
    return axiosClient.put("/comment/updateComment", {}, { params });
  }

  deleteComment(params) {
    return axiosClient.delete("/comment/deleteComment", { params });
  }
}

export default CommentService;
