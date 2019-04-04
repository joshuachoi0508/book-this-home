import React from 'react';

const Confirmation = props => {
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
                                <span className="travel-date">Wednesday,</span>
                                <span className="travel-date">Aug 08, 2018</span>
                                <span className="check-in-out-info">Check-in time is 3PM - 10PM</span>
                            </div>
                            <div className="check-out-div">
                                <span className="travel-date">Friday,</span>
                                <span className="travel-date">Aug 10, 2018</span>
                                <span className="check-in-out-info">Flexible check out time</span>
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