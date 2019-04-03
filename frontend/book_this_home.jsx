import React from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import GuestCount from './guest_count';
import PriceBreakdown from './price_breakdown';

class BookThisHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            startDate: null,
            endDate: null,
            focusedInput: null,
            numGuests: 1,
            numAdults: 1,
            numInfants: 0,
            numChildren: 0,
            guestOption: 'guest-option-divs-no-show',
            priceBreakdownClass: 'price-breakdown-div-no-show',
            guestButtonClass: 'guest-button',
            guestCountClass: '',
            infantCountClass: ''
        }
        this.renderMinusButton = this.renderMinusButton.bind(this);
        this.renderComma = this.renderComma.bind(this);
        this.renderPlusButton = this.renderPlusButton.bind(this);
        this.renderGuestCount = this.renderGuestCount.bind(this);
        this.renderInfantCount = this.renderInfantCount.bind(this);
        this.closeGuestOption = this.closeGuestOption.bind(this);
        this.renderGuestOption = this.renderGuestOption.bind(this);
        this.increaseGuestCount = this.increaseGuestCount.bind(this);
        this.decreaseGuestCount = this.decreaseGuestCount.bind(this);
        this.renderNight = this.renderNight.bind(this);
    };

    componentDidMount() {
        window.addEventListener('click', (e) => {
            function childOfGuestOption (element) {
                if (element.className === "guest-option-divs") {
                    return true;
                } else if (element.tagName === "HTML") {
                    return false;
                } else {
                    return childOfGuestOption(element.parentElement);
                }
            }

            if (!childOfGuestOption(e.target)) {
                this.closeGuestOption(e);
            }
        })
    }

    componentDidUpdate() {
        if (this.state.endDate !== null && this.state.startDate !== null && this.state.priceBreakdownClass === "price-breakdown-div-no-show") {
            this.setState({ priceBreakdownClass: 'price-breakdown-div' })
        }
    }

    renderGuestCount() {
        if (this.state.numGuests > 1) {
            return String(this.state.numGuests) + " guests";
        } else {
            return String(this.state.numGuests) + " guest";
        }
    }

    renderInfantCount() {
        if (this.state.numInfants > 1) {
            return String(this.state.numInfants) + " infants";
        } else if (this.state.numInfants === 1) {
            return String(this.state.numInfants) + " infant";
        } else {
            return "";
        }
    }

    renderGuestOption(e) {
        e.stopPropagation();
        
        if (this.state.guestOption === 'guest-option-divs') {
            this.setState({ guestOption: 'guest-option-divs-no-show' })
            this.setState({ guestButtonClass: 'guest-button' })
            this.setState({ guestCountClass: '' })
            this.setState({ infantCountClass: '' })
        } else {
            this.setState({ guestOption: 'guest-option-divs' })
            this.setState({ guestButtonClass: 'guest-button big'})
            this.setState({ guestCountClass: 'guest-count-highlighted' })
        }
    }

    closeGuestOption(e) {
        this.setState({ guestOption: 'guest-option-divs-no-show' })
        this.setState({ guestButtonClass: 'guest-button' })
        this.setState({ guestCountClass: '' })
        this.setState({ infantCountClass: '' })
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
            this.setState({ numInfants: this.state.numInfants - 1 }, () => {
                if (this.state.numInfants === 0) {
                    this.setState({ infantCountClass: '' })
                }
            })
        }
    }

    increaseGuestCount(option) {
        if (option === "Adult") {
            this.setState({ numAdults: this.state.numAdults + 1 });
            this.setState({ numGuests: this.state.numGuests + 1 });
            this.setState({ guestCountClass: 'guest-count-highlighted' })
        }

        if (option === "Child") {
            this.setState({ numChildren: this.state.numChildren + 1 });
            this.setState({ numGuests: this.state.numGuests + 1 });
            this.setState({ guestCountClass: 'guest-count-highlighted' })
        }

        if (option === "Infant") {
            this.setState({ numInfants: this.state.numInfants + 1 });
            this.setState({ guestCountClass: '' })
            this.setState({ infantCountClass: 'infant-count-highlighted' })
        }
    }

    renderNight(days) {
        return days > 1 ? "nights" : "night";
    }

    renderComma() {
        if (this.state.numInfants > 0) {
            return ", "
        };
    }

    render(){
        let startDate;
        let endDate;
        let diffDays;

        if (this.state.startDate && this.state.endDate) {
            startDate = new Date(this.state.startDate.format());
            endDate = new Date(this.state.endDate.format());
            diffDays = parseInt((endDate - startDate) / (1000 * 60 * 60 * 24));
        }
        
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
                        startDatePlaceholderText="Check in"
                        endDatePlaceholderText="Check out"
                    />
                </div>
                <GuestCount 
                    renderMinusButton={this.renderMinusButton}
                    renderComma={this.renderComma}
                    renderPlusButton={this.renderPlusButton}
                    renderGuestCount={this.renderGuestCount}
                    renderGuestOption={this.renderGuestOption}
                    renderInfantCount={this.renderInfantCount}
                    closeGuestOption={this.closeGuestOption}
                    state={this.state}
                />
                <PriceBreakdown
                    diffDays={diffDays}
                    price={this.props.price}
                    priceBreakdownClass={this.state.priceBreakdownClass}
                    renderNight={this.renderNight}
                    state={this.state}
                />
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
        )
    }
}

export default BookThisHome;