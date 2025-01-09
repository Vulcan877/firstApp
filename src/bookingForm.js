// bookingForm.js
import React, { useReducer, useEffect, useState } from 'react';

const fetchData = async (date) => {
    const response = await new Promise((resolve) =>
        setTimeout(() => resolve(['12:00 PM', '1:00 PM', '2:00 PM']), 1000)
    );
    return response;
};

const initializeTimes = async () => {
    const today = new Date().toISOString().split('T')[0];
    return await fetchData(today);
};

const updateTimes = async (selectedDate) => {
    return await fetchData(selectedDate);
};

const timesReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALIZE':
            return action.payload;
        case 'UPDATE':
            return action.payload;
        default:
            return state;
    }
};

const BookingForm = ({ availableTimes, dispatch, submitForm }) => {
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchInitialTimes = async () => {
            const initialTimes = await initializeTimes();
            dispatch({ type: 'INITIALIZE', payload: initialTimes });
        };
        fetchInitialTimes();
    }, [dispatch]);

    const handleDateChange = async (event) => {
        const selectedDate = event.target.value;
        const updatedTimes = await updateTimes(selectedDate);
        dispatch({ type: 'UPDATE', payload: updatedTimes });
    };

    const validateForm = (formData) => {
        const newErrors = {};

        if (!formData.date) {
            newErrors.date = 'Date is required.';
        }

        if (!formData.time) {
            newErrors.time = 'Time is required.';
        }

        if (!formData.guests || formData.guests < 1 || formData.guests > 10) {
            newErrors.guests = 'Guests must be between 1 and 10.';
        }

        if (!formData.occasion) {
            newErrors.occasion = 'Occasion is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            date: event.target['res-date'].value,
            time: event.target['res-time'].value,
            guests: parseInt(event.target['guests'].value, 10),
            occasion: event.target['occasion'].value,
        };

        if (validateForm(formData)) {
            submitForm(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'grid', maxWidth: '200px', gap: '20px' }}>
            <label htmlFor="res-date">Choose date</label>
            <input type="date" id="res-date" onChange={handleDateChange} />
            {errors.date && <span style={{ color: 'red' }}>{errors.date}</span>}

            <label htmlFor="res-time">Choose time</label>
            <select id="res-time">
                <option value="">Select a time</option>
                {availableTimes.map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                ))}
            </select>
            {errors.time && <span style={{ color: 'red' }}>{errors.time}</span>}

            <label htmlFor="guests">Number of guests</label>
            <input type="number" placeholder="1" min="1" max="10" id="guests" />
            {errors.guests && <span style={{ color: 'red' }}>{errors.guests}</span>}

            <label htmlFor="occasion">Occasion</label>
            <select id="occasion">
                <option value="">Select an occasion</option>
                <option>Birthday</option>
                <option>Anniversary</option>
            </select>
            {errors.occasion && <span style={{ color: 'red' }}>{errors.occasion}</span>}

            <button aria-label="On Click" type="submit">Make Your Reservation</button>
        </form>
    );
};

export default BookingForm;
