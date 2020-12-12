import React from 'react';
import { shallow } from 'enzyme';
import AddDevice from './addDevice';

describe('AddDevice', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<AddDevice />);
    expect(wrapper).toMatchSnapshot();
  });
});
