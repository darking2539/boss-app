import React from 'react';
import { shallow } from 'enzyme';
import Mainprofile from './mainprofile';

describe('Mainprofile', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Mainprofile />);
    expect(wrapper).toMatchSnapshot();
  });
});


