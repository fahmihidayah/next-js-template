
import axios from "axios";
import { authProvider, getUserWithToken } from "../provider/auth";

const axiosInstance = axios.create({
  baseURL : "http://localhost:3000/api/",
  timeout : 1000,

  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use( (request) => {
  console.log(request)
  return request;
})

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`response : ${response}`)
    return response;
  },
  (error) => {
    let message : string = "Unknown error"
    if(error.code === "ERR_NETWORK") {
      message = "Error network";
    }
    else if(error.response.data.message) {
      message = error.response.data.message
    }

    const customError = {
      ...error,
      message: message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

export { axiosInstance };
