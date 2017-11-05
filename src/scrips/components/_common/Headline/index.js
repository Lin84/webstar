import React from 'react';
import PropTypes from 'prop-types';

const Headline = (props) => {
    return (
        <h1 className="headline">{props.label}</h1>
    );
};

Headline.propTypes = {
    label: PropTypes.string.isRequired
};

Headline.defaultProps = {
    label: 'Headline'
};

export default Headline;
