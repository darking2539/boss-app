import React from 'react';
import { shallow } from 'enzyme';
import Searchlog from './searchlog';

describe('Searchlog', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Searchlog />);
    expect(wrapper).toMatchSnapshot();
  });
});
