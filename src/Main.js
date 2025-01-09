// Main.js
import React, { useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import BookingPage from './bookingPage';
import ConfirmedBooking from './confirmedBooking';

// Function to simulate the API call
const submitAPI = (formData) => {
    // Replace with actual API call logic
    return true; // Simulates successful booking
};

const initializeTimes = () => {
    return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
};

const updateTimes = (state, action) => {
    switch (action.type) {
        case 'UPDATE':
            return initializeTimes();
        default:
            return state;
    }
};

function Main() {
    const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());
    const navigate = useNavigate();

    const submitForm = (formData) => {
        if (submitAPI(formData)) {
            navigate('/booking-confirmed');
        }
    };

    return (
        <main>
            <Routes>
                <Route
                    path="/"
                    element={<BookingPage availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />}
                />
                <Route path="/booking-confirmed" element={<ConfirmedBooking />} />
            </Routes>
        </main>
    );
}

export default function App() {
    return (
        <Router>
            <Main />
        </Router>
    );
}
