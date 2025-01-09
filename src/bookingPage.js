// BookingPage.js
import React from 'react';
import BookingForm from 'bookingForm.js';

const BookingPage = ({ availableTimes, dispatch }) => {
    return (
        <div>
            {/* Content before the form */}
            <header>
                <h1>Book Your Reservation</h1>
                <p>Fill out the form below to create a booking.</p>
            </header>

            {/* The BookingForm component */}
            <BookingForm availableTimes={availableTimes} dispatch={dispatch} />

            {/* Content after the form */}
            <footer>
                <p>Need help? Contact us at LittleLemonSupport@gmail.com</p>
            </footer>
        </div>
    );
};

export default BookingPage;
