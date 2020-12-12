import React from 'react';
import { shallow } from 'enzyme';
import Mainnote from './mainnote';

describe('Mainnote', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Mainnote />);
    expect(wrapper).toMatchSnapshot();
  });
});
