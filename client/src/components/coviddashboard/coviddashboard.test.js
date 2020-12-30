import React from "react";
import { shallow } from "enzyme";
import Coviddashboard from "./coviddashboard";

describe("Coviddashboard", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Coviddashboard />);
    expect(wrapper).toMatchSnapshot();
  });
});
