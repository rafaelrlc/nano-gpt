import axios from "axios";

const BASE_URL = "http://localhost:3004/controller";

const AxiosApi = () => {
  const api = axios.create({
    baseURL: BASE_URL,
  });

  return { api };
};

export default AxiosApi;
