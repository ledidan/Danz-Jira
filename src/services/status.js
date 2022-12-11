import axiosClient from "./axiosClient";

class StatusService {
  getStatus() {
    return axiosClient.get(`/status/getAll`);
  }
}

export default StatusService;
