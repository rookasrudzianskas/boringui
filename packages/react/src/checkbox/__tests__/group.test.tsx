import React from "react";
import {mount, ReactWrapper} from "enzyme";
import userEvent from "@testing-library/user-event";

import Checkbox from "../index";

const getCheckboxElement = (wrapper: ReactWrapper) => {
  return wrapper.find("input");
};

describe("Checkbox Group", () => {
  it("should render correctly", () => {
    const wrapper = mount(
      <Checkbox.Group defaultValue={[]} label="Select cities">
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
      </Checkbox.Group>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should work correctly with different sizes", () => {
    const wrapper = mount(
      <div>
        <Checkbox.Group aria-label="Single city xs size" defaultValue={[]} size="xs">
          <Checkbox value="sydney">Sydney</Checkbox>
        </Checkbox.Group>
        <Checkbox.Group aria-label="Single city sm size" size="sm" value={[]}>
          <Checkbox value="sydney">Sydney</Checkbox>
        </Checkbox.Group>
        <Checkbox.Group aria-label="Single city md size" size="md" value={[]}>
          <Checkbox value="sydney">Sydney</Checkbox>
        </Checkbox.Group>
        <Checkbox.Group aria-label="Single city lg size" size="lg" value={[]}>
          <Checkbox value="sydney">Sydney</Checkbox>
        </Checkbox.Group>
      </div>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should work correctly with initial value", () => {
    let wrapper = mount(
      <Checkbox.Group defaultValue={["sydney"]} label="Select cities">
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="beijing">BeiJing</Checkbox>
      </Checkbox.Group>,
    );
    const sydney = getCheckboxElement(wrapper).at(0).getDOMNode();

    expect((sydney as HTMLInputElement).checked).toBeTruthy();
    const beijing = getCheckboxElement(wrapper).at(1).getDOMNode();

    expect((beijing as HTMLInputElement).checked).not.toBeTruthy();
  });

  it("should change value after click", () => {
    let value = ["sydney"];
    const wrapper = mount(
      <Checkbox.Group
        defaultValue={["sydney"]}
        label="Select cities"
        onChange={(val) => (value = val)}
      >
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="beijing">BeiJing</Checkbox>
      </Checkbox.Group>,
    );
    const sydney = getCheckboxElement(wrapper).at(0);

    userEvent.click(sydney.getDOMNode());
    expect(value.length).toBe(0);

    const beijing = getCheckboxElement(wrapper).at(1);

    userEvent.click(beijing.getDOMNode());
    expect(value).toEqual(expect.arrayContaining(["beijing"]));
  });

  it("should ignore events when disabled", () => {
    let value = ["sydney"];
    const wrapper = mount(
      <Checkbox.Group
        isDisabled
        defaultValue={["sydney"]}
        label="Select cities"
        onChange={(val) => (value = val)}
      >
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="beijing">BeiJing</Checkbox>
      </Checkbox.Group>,
    );
    const sydney = getCheckboxElement(wrapper).at(0);

    userEvent.click(sydney.getDOMNode());
    expect(value.length).not.toBe(0);

    const beijing = getCheckboxElement(wrapper).at(1);

    userEvent.click(beijing.getDOMNode());
    expect(value).not.toEqual(expect.arrayContaining(["beijing"]));
  });
});
