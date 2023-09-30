import axios from 'axios';
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const useAxios = () => {
  const token = useSelector((state) => state.token);

  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.common['x-auth-token'] = token; 
    axios.defaults.headers.common['langId'] = 1;
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.timeout = 60000;
  }, [token]);

  return axios;
};
