import axiosClient from "./axiosClient";

class PriorityService {
  getPriority() {
    return axiosClient.get(`/priority/getAll`);
  }
}

export default PriorityService;
