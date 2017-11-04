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

// describe('Rendering Butaton', () => {
//     it('should render a <Button />')
//     it('should render a label')
//     describe('no type', () => {
//         it('should have the default style')
//     })
//     describe('primary type', () => {
//         it('should have the primary style');
//     });
// });

// describe('Interaction', () => {
//     describe('clicking the button', () => {
//         it('should call the onClick callback')
//     })
// })

const wrapper = shallow(<Button />)

it('should render a <Button />', () => {
    expect(wrapper.find('Button')).toHaveLength(1)
})
