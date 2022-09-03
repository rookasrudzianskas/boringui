import React from "react";
import {mount} from "enzyme";

import {Input} from "../../index";
import {nativeEvent} from "../../../tests/utils";

describe("InputPassword", () => {
  it("should render correctly", () => {
    const wrapper = mount(<Input.Password />);
    const el = wrapper.find("input").getDOMNode() as HTMLInputElement;

    expect(el.type).toEqual("password");
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should toggle input type", () => {
    const wrapper = mount(<Input.Password />);

    wrapper.find(".nextui-input-content").at(0).simulate("click", nativeEvent);
    const el = wrapper.find("input").getDOMNode() as HTMLInputElement;

    expect(el.type).toEqual("text");
  });

  it("should hide toggle icon", () => {
    const wrapper = mount(<Input.Password hideToggle />);

    expect(wrapper.find(".nextui-input-content").at(0).length).toBe(0);
  });
});
