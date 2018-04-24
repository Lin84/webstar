import React from 'react';
import { shallow } from 'enzyme';

import Headline from './index';

/**
 * @param {object} props
 */
const createTestProps = props => ({
    label: 'Headline',
    ...props
});

/**
 * @param {object} props
 */
const createWrapper = props => shallow(<Headline {...props} />);

describe('rendering Headline', () => {
    let wrapper;
    let props;

    beforeEach(() => {
        props = createTestProps();
        wrapper = createWrapper(props);
    });

    it('should render headline label', () => {
        expect(wrapper.find('h1').text()).toEqual('Headline');
    });
});
