import axios from "axios";

const BASE_URL = "http://localhost:3004/controller";

const AxiosApi = () => {
  const privateApi = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const api = axios.create({
    baseURL: BASE_URL,
  });

  return { privateApi, api };
};

export default AxiosApi;
