import React from "react";
import { shallow } from "enzyme";
import Spontify from "./spontify";

describe("Spontify", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Spontify />);
    expect(wrapper).toMatchSnapshot();
  });
});
