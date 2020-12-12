import React from 'react';
import { shallow } from 'enzyme';
import Editprofile from './editprofile';

describe('Editprofile', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Editprofile />);
    expect(wrapper).toMatchSnapshot();
  });
});
