import React from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import Modal from 'react-modal';

import GuestCount from './guest_count';
import PriceBreakdown from './price_breakdown';
import Confirmation from './confirmation'

class BookThisHome extends React.Component {
    constructor(props) {
        super(props);4
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
            infantCountClass: '',
            showModal: false,
            errors: []
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    };

    componentDidMount() {
        //Appending event listener on the window for closing the guest option div.
        //The childOfGuestOption function recursively calls the clicked element's parent.
        //When the eventual parent is "ghest-option-divs", it doesn't close since 
        //it means the click was within the div. If the eventual parent is an HTML tag
        //it means the click was outside of the div and the div closes. 
        window.addEventListener('click', (e) => {
            if (!childOfGuestOption(e.target)) {
                this.closeGuestOption();
            }

            function childOfGuestOption (element) {
                if (element === null)  return false;

                if (element.className === "guest-option-divs") {
                    return true;
                } else if (element.tagName === "HTML") {
                    return false;
                } else {
                    return childOfGuestOption(element.parentElement);
                }
            }

        })
    }

    componentDidUpdate(prevProps, prevState) {
        //Logics for rendering the "price-breakdown-div". 
        //If the startDate and endDate are chosen, the breakdown div shows.
        //Otherwise, the breakdown div doesn't show

        if (this.state.priceBreakdownClass === "price-breakdown-div" 
            && (this.state.endDate === null || this.state.startDate === null)) {
            this.setState({ priceBreakdownClass: 'price-breakdown-div-no-show' })
        }

        if (this.state.endDate !== null && this.state.startDate !== null 
            && this.state.priceBreakdownClass === "price-breakdown-div-no-show") {
            this.setState({ priceBreakdownClass: 'price-breakdown-div' })
        }

        //clear error messages when check in and check out dates are entered
        if (prevState.errors.length > 0 && this.state.endDate && this.state.startDate) {
            this.setState({ errors: [] })
        }

        //Event listener for modal to close when clicked outside of the confirmation modal
        if (document.querySelector(".ReactModal__Overlay")) {
            
            document.querySelector(".ReactModal__Overlay")
            .addEventListener('click', (e) => {
                function childOfConfirmationDiv(element) {
                    if (element.className === "confirmation-div") {
                        return true;
                    } else if (element.tagName === "HTML") {
                        return false;
                    } else {
                        return childOfConfirmationDiv(element.parentElement);
                    }
                }
                if (!childOfConfirmationDiv(e.target)) {
                    this.handleCloseModal();
                }
            })
        }
    }

    //style change for main-div so main-div's scroll doesn't overlap with the modal's scroll
    handleOpenModal() {
        this.setState({ showModal: true });
        document.getElementById('main-div').style.display = "none";
    }
    
    handleCloseModal() {
        this.setState({ showModal: false });
        document.getElementById('main-div').style.display = "block";
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
            this.setState({ 
                guestOption: 'guest-option-divs-no-show',
                guestButtonClass: 'guest-button',
                guestCountClass: '',
                infantCountClass: ''
            })
        } else {
            this.setState({ 
                guestOption: 'guest-option-divs',
                guestButtonClass: 'guest-button big',
                guestCountClass: 'guest-count-highlighted' 
            })
        }
    }

    closeGuestOption() {
        this.setState({ 
            guestOption: 'guest-option-divs-no-show',
            guestButtonClass: 'guest-button',
            guestCountClass: '',
            infantCountClass: ''
        })
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
                return (<button 
                    className="guest-count-button" 
                    onClick={() => { this.increaseGuestCount("Adult") }} >
                    +</button>)
            }

            if (option === "Child") {
                return (<button 
                    className="guest-count-button" 
                    onClick={() => { this.increaseGuestCount("Child") }} >
                    +</button>)
            }
        }

        if (option === "Infant") {
            if (this.state.numInfants >= 5) {
                return (<button 
                    disabled={true} 
                    className="guest-count-button disabled" 
                    onClick={() => { this.increaseGuestCount("Infant") }}>
                    +</button>)
            } else {
                return (<button 
                    className="guest-count-button disabled" 
                    onClick={() => { this.increaseGuestCount("Infant") }} >
                    +</button>)
            }
        }
    }

    decreaseGuestCount(option) {
        if (option === "Adult") {
            this.setState({ 
                numAdults: this.state.numAdults - 1,
                numGuests: this.state.numGuests - 1,
                guestCountClass: 'guest-count-highlighted',
                infantCountClass: ''
            });
        }

        if (option === "Child") {
            this.setState({ 
                numChildren: this.state.numChildren - 1,
                numGuests: this.state.numGuests - 1,
                guestCountClass: 'guest-count-highlighted',
                infantCountClass: ''
            });
        }

        if (option === "Infant") {
            this.setState({ 
                numInfants: this.state.numInfants - 1,
                infantCountClass: 'infant-count-highlighted',
                guestCountClass: ''
            }, () => {
                if (this.state.numInfants === 0) {
                    this.setState({ infantCountClass: '' })
                }
            })
        }
    }

    increaseGuestCount(option) {
        if (option === "Adult") {
            this.setState({ 
                numAdults: this.state.numAdults + 1,
                numGuests: this.state.numGuests + 1,
                guestCountClass: 'guest-count-highlighted',
                infantCountClass: ''
            });
        }

        if (option === "Child") {
            this.setState({ 
                numChildren: this.state.numChildren + 1,
                numGuests: this.state.numGuests + 1,
                guestCountClass: 'guest-count-highlighted',
                infantCountClass: ''
             });
        }

        if (option === "Infant") {
            this.setState({ 
                numInfants: this.state.numInfants + 1,
                guestCountClass: '',
                infantCountClass: 'infant-count-highlighted'
            });
        }
    }

    renderNight(days) {
        return days > 1 ? "nights" : "night";
    }

    renderComma() {
        if (this.state.numInfants > 0) return ", ";
    }

    handleSubmit() {
        if (this.state.startDate && this.state.endDate) {
            this.handleOpenModal();
        } else {
            this.setState({ errors: ["Plead enter check in and check out date"] })
        }
    }

    renderErrors() {
        return (
            this.state.errors.map(error => (
                <span className="error-messages" key={"error" + error}>{error}</span>
            ))
        )
    }

    render(){
        //logic for finding the days between end date and start date
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

                <Modal 
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    ariaHideApp={false}
                >
                    <Confirmation 
                        closeModal={this.handleCloseModal}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                    />
                </Modal>

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
                />

                <button className="book-button" onClick={this.handleSubmit}>Book</button>
                <span className="charge-description">You won't be charged yet</span>

                <div className="error-messages-div">
                    {this.renderErrors()}
                </div>

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