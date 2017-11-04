import React from 'react';
import PropTypes from 'prop-types';

const Headline = (props) => {
    return (
        <h1 className="headline">{props.text}</h1>
    );
};

Headline.propTypes = {
    text: PropTypes.string.isRequired
};

Headline.defaultProps = {
    text: 'Headline'
};

export default Headline;
