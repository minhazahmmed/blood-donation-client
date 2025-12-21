import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyRequest = () => {

    const [myRequests, setMyRequests] = useState([])
    const axiosSecure = useAxiosSecure();

    useEffect(()=> {
        axiosSecure.get('/my-request?size=10&page=0')
        .then(res => {
            setMyRequests(res.data)
        })
    },[axiosSecure])
    console.log(myRequests);
    

    return (
        <div>
             My Request
        </div>
    );
};

export default MyRequest;