import React from 'react';
import ReactDOM from 'react-dom';
import BookThisHome from './book_this_home';

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");

    ReactDOM.render(
        <Root />,
        root
    );
});

function Root() {
    return (
        <>
            <BookThisHome />
        </>
    );
}