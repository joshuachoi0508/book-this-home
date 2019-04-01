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
            address: '',
            renderGuest: 'num-guest-hide'
        }
    };

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
                <form>
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
                            // small
                            showClearDates
                            startDatePlaceholderText="Check in"
                            endDatePlaceholderText="Check out"
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default BookThisHome;