import React from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class BookThisHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            startDate: null,
            endDate: null,
            focusedInput: null,
            openDropdown: 'hidden',
            numGuests: 1,
            numAdults: 1,
            numInfants: 0,
            numChildren: 0,
            address: '',
            guestOption: 'guest-option-divs-no-show'
        }
        this.renderGuestOption = this.renderGuestOption.bind(this);
        this.increaseGuestCount = this.increaseGuestCount.bind(this);
        this.decreaseGuestCount = this.decreaseGuestCount.bind(this);
    };

    renderGuestCount() {
        if (this.state.numGuests > 1) {
            return String(this.state.numGuests) + " guests";
        } else {
            return String(this.state.numGuests) + " guest";
        }
    }

    renderInfantCount() {
        if (this.state.numInfants > 1) {
            return ", " + String(this.state.numInfants) + " infants";
        } else if (this.state.numInfants === 1) {
            return ", " + String(this.state.numInfants) + " infant";
        } else {
            return "";
        }
    }

    renderGuestOption() {
        if (this.state.guestOption === 'guest-option-divs') {
            this.setState({ guestOption: 'guest-option-divs-no-show' })
        } else {
            this.setState({guestOption: 'guest-option-divs' })
        }
    }

    renderMinusButton(option) {
        if (option === "Adult") {
            if (this.state.numAdults === 1) {
                return (<button disabled={true} className="guest-count-button disabled">-</button>)
            } else {
                return (<button
                    className="guest-count-button"
                    onClick={() => {this.decreaseGuestCount("Adult")}}
                >-</button>)
            }
        }

        if (option === "Child") {
            if (this.state.numChildren === 0) {
                return (<button disabled={true} className="guest-count-button disabled">-</button>)
            } else {
                return (<button
                    className="guest-count-button"
                    onClick={() => {this.decreaseGuestCount("Child")}}
                >-</button>)
            }
        }

        if (option === "Infant") {
            if (this.state.numInfants === 0) {
                return (<button disabled={true} className="guest-count-button disabled">-</button>)
            } else {
                return (<button
                    className="guest-count-button"
                    onClick={() => { this.decreaseGuestCount("Infant") }}
                >-</button>)
            }
        }
    }

    renderPlusButton(option) {
        // if (option === "Adult") {
        //     if (this.state.numGuests >= 2) {
        //         return (<button
        //             disabled={true}
        //             className="guest-count-button disabled"
        //             onClick={() => { this.increaseGuestCount("Adult") }}
        //         >+</button>)
        //     } else {
        //         return (<button
        //             className="guest-count-button"
        //             onClick={() => { this.increaseGuestCount("Adult") }}
        //         >+</button>)
        //     }
        // }

        if (this.state.numGuests >= 2) {
            if (option === "Adult") {
                return (<button disabled={true} className="guest-count-button disabled">+</button>)
            } 

            if (option === "Child") {
                return (<button disabled={true} className="guest-count-button disabled">+</button>) 
            }
        }

        if (this.state.numGuests < 2) {
            if (option === "Adult") {
                return (<button className="guest-count-button" onClick={() => { this.increaseGuestCount("Adult") }} >+</button>)
            }

            if (option === "Child") {
                return (<button className="guest-count-button" onClick={() => { this.increaseGuestCount("Child") }} >+</button>)
            }
        }

        if (option === "Infant") {
            if (this.state.numInfants >= 5) {
                return (<button disabled={true} className="guest-count-button disabled" onClick={() => { this.increaseGuestCount("Infant") }}>+</button>)
            } else {
                return (<button className="guest-count-button disabled" onClick={() => { this.increaseGuestCount("Infant") }} >+</button>)
            }
        }
    }

    decreaseGuestCount(option) {
        if (option === "Adult") {
            this.setState({ numAdults: this.state.numAdults - 1 });
            this.setState({ numGuests: this.state.numGuests - 1 });
        }

        if (option === "Child") {
            this.setState({ numChildren: this.state.numChildren - 1 });
            this.setState({ numGuests: this.state.numGuests - 1 });
        }

        if (option === "Infant") {
            this.setState({ numInfants: this.state.numInfants - 1 });
        }
    }

    increaseGuestCount(option) {
        if (option === "Adult") {
            this.setState({ numAdults: this.state.numAdults + 1 });
            this.setState({ numGuests: this.state.numGuests + 1 });
        }

        if (option === "Child") {
            this.setState({ numChildren: this.state.numChildren + 1 });
            this.setState({ numGuests: this.state.numGuests + 1 });
        }

        if (option === "Infant") {
            this.setState({ numInfants: this.state.numInfants + 1 });
        }
    }

    render(){
        return(
            <div id="main-div">
                <div className="price-and-review-div">
                    <div className="price-div">
                        <span className="price">${this.props.price}</span>
                        <span className="per-night">per night</span>
                    </div>
                    <div className="review-div">
                        <img id="review" src="images/review.png"></img>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="date-picker-div">
                    <span className="option-name">Dates</span>
                    <DateRangePicker
                        startDateId="start_date_id"
                        endDateId="end_date_id"
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate }); }}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={(focusedInput) => { this.setState({ focusedInput }); }}
                        numberOfMonths={1}
                        hideKeyboardShortcutsPanel
                        regular
                        showClearDates
                        startDatePlaceholderText="Check in"
                        endDatePlaceholderText="Check out"
                    />
                </div>
                <div className="guest-count-div">
                    <span className="option-name">Guests</span>
                    <button className="guest-button" onClick={this.renderGuestOption}>
                        <span>{this.renderGuestCount()}{this.renderInfantCount()}</span>
                        <img id="guest-down-button" src="images/down_arrow.png"></img>
                    </button>
                    <div className={this.state.guestOption} >
                        <div className="guest-option-div">
                            <div className="adult-option-div">
                                <div className="adult-count-div">
                                    <span className="guest-option-name">Adults</span>
                                </div>
                                <div className="count-button-div">
                                    {this.renderMinusButton("Adult")}
                                    <span className="guest-option-count">{this.state.numAdults}</span>
                                    {this.renderPlusButton("Adult")}
                                </div>
                            </div>
                            <div className="children-infant-option-div">
                                <div className="children-infant-count-div">
                                    <span className="guest-option-name">Children</span>
                                    <span className="guest-option-description">Ages 2-12</span>
                                </div>
                                <div className="count-button-div">
                                    {this.renderMinusButton("Child")}
                                    <span className="guest-option-count">{this.state.numChildren}</span>
                                    {this.renderPlusButton("Child")}
                                </div>
                            </div>
                            <div className="children-infant-option-div">
                                <div className="children-infant-count-div">
                                    <span className="guest-option-name">Infants</span>
                                    <span className="guest-option-description">Ages 2-12</span>
                                </div>
                                <div className="count-button-div">
                                    {this.renderMinusButton("Infant")}
                                    <span className="guest-option-count">{this.state.numInfants}</span>
                                    {this.renderPlusButton("Infant")}
                                </div>
                            </div>
                            <p className="guest-maxinum-description">
                                2 guests maximum. Infants don’t count toward the number of guests.
                            </p>
                            <div className="guest-option-close-button-div">
                                <button className="guest-option-close-button" onClick={this.renderGuestOption}>Close</button>
                            </div>
                        </div>
                    </div>
                    <button className="book-button">Book</button>
                    <span className="charge-description">You won't be charged yet</span>
                    <div className="divider with-margin"></div>
                    <div className="home-view-alert-div">
                        <div className="home-view-description-div">
                            <span className="people-mind">This home is on people's minds.</span>
                            <span className="been-viewed">It’s been viewed 500+ times in the past week.</span>
                        </div>
                        <img className="light-bulb" src="https://a0.muscache.com/airbnb/static/page3/icon-uc-light-bulb-b34f4ddc543809b3144949c9e8cfcc8d.gif"></img>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookThisHome;