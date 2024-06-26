import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useFetchAppointmentById = (id) => {
    const [appointment, setAppointment] = useState('');
    const token = useSelector((state) => state.user.credentials.token);

    useEffect(() => {
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(`https://backend-dental-clinic.vercel.app/appointment/getAppointmentById/${id}`, config)
            .then((res) => res.json())
            .then((res) => {
                setAppointment(res.data); 
            })
            .catch(error => {
                console.error('Error fetching appointment:', error);
            });

    }, [id]);

    return appointment;
};