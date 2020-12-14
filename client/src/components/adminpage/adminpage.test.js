import React from 'react';
import { shallow } from 'enzyme';
import Adminpage from './adminpage';

describe('Adminpage', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Adminpage />);
    expect(wrapper).toMatchSnapshot();
  });
});
