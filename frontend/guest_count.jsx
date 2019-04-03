import React from 'react';

const GuestCount = props => {
    return (
        <div className="guest-count-div">
            <span className="option-name">Guests</span>

            <button className={props.state.guestButtonClass} onClick={(e) => { props.renderGuestOption(e) }}>
                <div className="guest-infant-count-div">
                    <span className={props.state.guestCountClass}>{props.renderGuestCount()}</span>
                    <span>{props.renderComma()}</span>
                    <span className={props.state.infantCountClass}>{props.renderInfantCount()}</span>
                </div>
                <img id="guest-down-button" src="images/down_arrow.png"></img>
            </button>

            <div className={props.state.guestOption} >
                <div className="guest-option-div">

                    <div className="adult-option-div">
                        <div className="adult-count-div">
                            <span className="guest-option-name">Adults</span>
                        </div>
                        <div className="count-button-div">
                            {props.renderMinusButton("Adult")}
                            <span className="guest-option-count">{props.state.numAdults}</span>
                            {props.renderPlusButton("Adult")}
                        </div>
                    </div>

                    <div className="children-infant-option-div">
                        <div className="children-infant-count-div">
                            <span className="guest-option-name">Children</span>
                            <span className="guest-option-description">Ages 2-12</span>
                        </div>
                        <div className="count-button-div">
                            {props.renderMinusButton("Child")}
                            <span className="guest-option-count">{props.state.numChildren}</span>
                            {props.renderPlusButton("Child")}
                        </div>
                    </div>

                    <div className="children-infant-option-div">
                        <div className="children-infant-count-div">
                            <span className="guest-option-name">Infants</span>
                            <span className="guest-option-description">Ages 2-12</span>
                        </div>
                        <div className="count-button-div">
                            {props.renderMinusButton("Infant")}
                            <span className="guest-option-count">{props.state.numInfants}</span>
                            {props.renderPlusButton("Infant")}
                        </div>
                    </div>

                    <p className="guest-maxinum-description">
                        2 guests maximum. Infants don’t count toward the number of guests.
                    </p>
                    
                    <div className="guest-option-close-button-div">
                        <button className="guest-option-close-button" onClick={(e) => { props.closeGuestOption(e) }}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GuestCount;