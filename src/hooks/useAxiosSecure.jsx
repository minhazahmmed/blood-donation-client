import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

const useAxiosSecure = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
        const token = user?.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response
        }, (error) => {
            console.log(error);
            return Promise.reject(error)
        })

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        }

    }, [user])

    return axiosSecure
};

export default useAxiosSecure;