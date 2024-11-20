import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
const BASE_URL = "https://zarinkala.com/admin-api/v1/";
// const navigate = useNavigate();
const useAxios = axios.create({
  baseURL: BASE_URL,
});

const handleUnauthorized = () => {
  localStorage.removeItem("userData");
  localStorage.removeItem("token");
  localStorage.removeItem("login");
  window.location = "/login";
};

const getToken = () => {
  const token = localStorage.getItem("token");
  return token == null ? "" : token;
};

useAxios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

useAxios.interceptors.response.use(
  (response) => {
    if (response.data.message != "") toast.success(response.data.message);
    return response;
  },
  (error) => {
    if (error.response.status == 422) {
      Object.keys(error.response.data.errors).map((err) =>
        error.response.data.errors[err].map((item) => toast.error(item))
      );
    }
    if (error.response.status == 401) {
      handleUnauthorized();
    }
    if (
      error.response.status == 429 ||
      error.response.status == 403 ||
      error.response.status == 500 ||
      error.response.status == 503
    ) {
      toast.error(error.response.data.message);
    }
    toast.error(error.response.data.message);

    return Promise.reject(error);
  }
);

export default useAxios;
