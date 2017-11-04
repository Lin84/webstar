// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// const Button = props => {
//     return (
//         <button className={`btn ${props.class}`}>
//             {props.label}
//         </button>
//     );
// };

// export default Button;

// Button.propTypes = {
//     class: PropTypes.string.isRequired,
//     label: PropTypes.string.isRequired,
// };

// Button.defaultProps = {
//     class: 'btn-default',
//     label: 'button',
// };

import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
    return <button className={`btn ${props.class}`}>{props.label}</button>;
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired,
};

Button.defaultProps = {
    label: 'Button',
    class: 'btn-default',
};

export default Button;
