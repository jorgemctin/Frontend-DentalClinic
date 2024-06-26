import { useEffect, useState } from "react";

//SELECTING SERVICES FOR THE APPOINTMENT
export const SelectServices = ({handleChange, value}) => {

    //USER SELECTED SERVICE FROM THE FATHER COMPONENT
    const [selectedService, setSelectedService] = useState(value);
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch("https://backend-dental-clinic.vercel.app/service/getAll")
            .then((res) => res.json())
            .then((res) => {
                setServices(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <select 
            id={"serviceSelect"}
            className={"inputAppointment" }
            value={selectedService} 
            onChange={(e) => {
                handleChange(e.target.value); 
                setSelectedService(e.target.value)}}>
                <option value="">SELECT SERVICE</option>
                {services.map((service) => (
                    <option key={service.id} value={service.id}>
                        {service.name}
                    </option>
                ))}
            </select>
            {/* <div>{selectedService && `Selected service: ${selectedService}`}</div> */}
        </>
    );
};