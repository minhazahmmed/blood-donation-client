import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyRequest = () => {

    const [myRequests, setMyRequests] = useState([])
    const axiosSecure = useAxiosSecure();

    useEffect(()=> {
        axiosSecure.get('/my-request')
        .then(res => {
            console.log(res.data);
        })
    },[axiosSecure])

    return (
        <div>
             My Request
        </div>
    );
};

export default MyRequest;