import React from 'react';

const PriceBreakdown = props => {
    return (
        <div className={props.priceBreakdownClass}>
            <div className="price-section">
                <span className="price-section-text">{props.price} x {props.diffDays} {props.renderNight(props.diffDays)}</span>
                <span className="price-section-text">${props.diffDays ? props.price * props.diffDays : props.price}</span>
            </div>
            <div className="divider"></div>
            <div className="price-section">
                <span className="price-section-text">Cealning fee</span>
                <span className="price-section-text">$75</span>
            </div>
            <div className="divider"></div>
            <div className="price-section">
                <span className="price-section-text">Service fee</span>
                <span className="price-section-text">$71</span>
            </div>
            <div className="divider"></div>
            <div className="price-section">
                <span className="price-section-text">Occupancy taxes and feest</span>
                <span className="price-section-text">$43</span>
            </div>
            <div className="divider"></div>
            <div className="price-section">
                <span className="total-section-text">Total</span>
                <span className="total-section-text">${props.diffDays ? props.price * props.diffDays + 75 + 71 + 43 : props.price + 75 + 71 + 43}</span>
            </div>
        </div>
    )
}

export default PriceBreakdown;