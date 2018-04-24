import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
    return (
        <button
            className={`btn ${props.customClass}`}
            onClick={props.handleClick}
        >
            { props.label }
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    customClass: PropTypes.string,
    handleClick: PropTypes.func.isRequired
};

Button.defaultProps = {
    customClass: 'btn-default'
};

export default Button;
