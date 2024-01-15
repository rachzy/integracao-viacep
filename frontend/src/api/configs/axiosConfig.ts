import Axios, { AxiosError } from "axios";

const env = process.env.NODE_ENV;

const baseUrl = {
  development: "http://localhost:3000/api",
  test: "http://localhost:3000/api",
  production: "https://api.example.com",
};

export const api = Axios.create({
  baseURL: baseUrl[env],
  withCredentials: true,
});

function errorHandler(error: AxiosError) {
  if (!error.request) return Promise.reject(error);

  const { status } = error.request;

  if (status !== 401) {
    console.error(error);
  }

  if(error.request.response) {
      const response = JSON.parse(error.request.response);
    
      return Promise.reject(response);
  }

  return Promise.reject(error);
}

api.interceptors.response.use(undefined, errorHandler);
