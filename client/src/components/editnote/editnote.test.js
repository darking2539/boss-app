import React from 'react';
import { shallow } from 'enzyme';
import Editnote from './editnote';

describe('Editnote', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Editnote />);
    expect(wrapper).toMatchSnapshot();
  });
});
