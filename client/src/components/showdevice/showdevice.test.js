import React from 'react';
import { shallow } from 'enzyme';
import Showdevice from './showdevice';

describe('Showdevice', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Showdevice />);
    expect(wrapper).toMatchSnapshot();
  });
});
