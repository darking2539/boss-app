import React from 'react';
import { shallow } from 'enzyme';
import Noteviewver from './noteviewver';

describe('Noteviewver', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Noteviewver />);
    expect(wrapper).toMatchSnapshot();
  });
});
