/**
 * example:
 * describe('rendering'):
 * // contains everything related to rendered output
 * describe('callbacks' / interactions /):
 * // contains everything related to callback functions and interactions
 * describe('lifecycle'):
 * contains tests related to react lifecycle functions
 */

import React from 'react';
import { shallow } from 'enzyme';

import Button from './index';

/**
 * @param {object} props
 * @return {object}
 */
const createTestProps = props => ({
    label: 'Submit',
    handleClick: () => {},
    ...props
});

/**
 * @param {object} props
 * @return {wrapper} contains shallow component
 */
const createWrapper = props => shallow(<Button {...props} />);

describe('rendering', () => {
    let wrapper;

    beforeEach(() => {
        const props = createTestProps();
        wrapper = createWrapper(props);
    });

    it('should render a react component Button', () => {
        expect(wrapper.find('button')).toHaveLength(1);
    });

    it('should render a label', () => {
        expect(wrapper.find('button').contains('Submit')).toBe(true);
    });

    describe('no custom class', () => {
        it('should have default custom class', () => {
            expect(wrapper.find('button').hasClass('btn-default')).toBe(true);
        });
    });

    describe('with custom class', () => {
        beforeEach(() => {
            const props = createTestProps({ customClass: 'btn-primary' });
            wrapper = createWrapper(props);
        });

        it('should have custom class', () => {
            expect(wrapper.find('button').hasClass('btn-primary')).toBe(true);
        });
    });
});

describe('interaction', () => {
    let wrapper;
    let props;

    beforeEach(() => {
        props = createTestProps({ handleClick: jest.fn() });
        wrapper = createWrapper(props);
    });

    describe('clicking the button', () => {
        beforeEach(() => {
            wrapper.find('button').prop('onClick')();
        });
        it('should call the onClick callBack', () => {
            expect(props.handleClick).toHaveBeenCalledTimes(1);
        });
    });
});
