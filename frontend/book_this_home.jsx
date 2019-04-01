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
            <>
                HEY
                <DateRangePicker
                    startDateId="landingStartDate"
                    endDateId="landingEndDate"
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate }); }}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={(focusedInput) => { this.setState({ focusedInput }); }}
                    hideKeyboardShortcutsPanel
                    small
                    showClearDates
                    reopenPickerOnClearDates
                    startDatePlaceholderText="Check in"
                    endDatePlaceholderText="Check out"
                />
            </>
        )
    }
}

export default BookThisHome;