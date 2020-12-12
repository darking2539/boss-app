import React from 'react';
import { shallow } from 'enzyme';
import Addnote from './addnote';

describe('Addnote', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Addnote />);
    expect(wrapper).toMatchSnapshot();
  });
});
