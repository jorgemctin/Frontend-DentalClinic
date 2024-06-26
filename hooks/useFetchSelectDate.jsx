import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isWeekend } from "date-fns";

export const SelectDate = ({ handleChange, value }) => {

    //USER SELECTED DATE FROM THE FATHER COMPONENT
    const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : '');

    // VERIFY IF IS WEEKEND
    const handleDateChange = (date) => {
        if (!isWeekend(date)) {
            setSelectedDate(date);
            handleChange(date);
        }
    };

    return (
        <>
            <DatePicker
                id="dateSelect"
                className="inputAppointment"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="SELECT DATE"
                dropdownMode="select"
                isClearable
                minDate={new Date()}
                filterDate={(date) => !isWeekend(date)}
            />
        </>
    );
};
