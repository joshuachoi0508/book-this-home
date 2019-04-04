import React from 'react';

const Confirmation = props => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return (
        <>
            <div className="confirmation-div">
                <div className="nav-bar-div">
                    <img className="airbnb-logo" src="images/airbnb_logo.png"></img>
                </div>

                <div className="confirmation-body-div">
                    <div className="confirmation-sub-body-div">
                        <div className="confirmation-header-div">
                            <span className="confirmation-title">
                                Your Reservation is confirmed
                            </span>
                            <span className="confirmation-subtitle">
                                You're going to New York!
                            </span>
                        </div>
                        
                        <div className="home-image-div">
                            <img className="home-image" src="images/home.jpg"></img>
                        </div>

                        <div className="confirmation-info-div">
                            <span className="confirmation-bottom-title">
                                Luxurious Home in Heart of New York
                            </span>
                            <span className="confirmation-bottom-message">
                                Entire Home hosted by Josh Choi
                            </span>
                        </div>
                        <div className="check-in-out-div">
                            <div className="check-in-div">
                                <span className="travel-date">{days[props.startDate.day()]},</span>
                                <span className="travel-date">
                                    {months[props.startDate.month()]}&nbsp;
                                    {props.startDate.date()},&nbsp;
                                    {props.startDate.year()}
                                </span>
                                <span className="check-in-out-info">Check-in time is 3PM - 10PM</span>
                            </div>

                            <div className="check-out-div">
                                <span className="travel-date">{days[props.endDate.day()]},</span>
                                <span className="travel-date">
                                    {months[props.endDate.month()]}&nbsp;
                                    {props.endDate.date()},&nbsp;
                                    {props.endDate.year()}
                                </span>
                                <span className="check-in-out-info">
                                    Flexible check out time
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
                <button 
                    onClick={props.closeModal}
                    className="close-modal-button">
                Close</button>
            </div>
        </>
    )
}

export default Confirmation;