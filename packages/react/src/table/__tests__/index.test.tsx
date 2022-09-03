import React from "react";
import {mount} from "enzyme";

import Table from "../index";

const STITCHES_FACTOR = 2;

const columns = [
  {name: "Foo", key: "foo"},
  {name: "Bar", key: "bar"},
  {name: "Baz", key: "baz"},
];

let items = [
  {test: "Test 1", foo: "Foo 1", bar: "Bar 1", yay: "Yay 1", baz: "Baz 1"},
  {test: "Test 2", foo: "Foo 2", bar: "Bar 2", yay: "Yay 2", baz: "Baz 2"},
];

describe("Table", () => {
  it("should render correctly", () => {
    const wrapper = mount(
      <Table aria-label="Test example table">
        <Table.Header>
          <Table.Column>NAME</Table.Column>
          <Table.Column>TYPE</Table.Column>
          <Table.Column>DATE MODIFIED</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row key="1">
            <Table.Cell>Games</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>6/7/2020</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );

    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render a static table", () => {
    const wrapper = mount(
      <Table aria-label="Static Table">
        <Table.Header>
          <Table.Column>Foo</Table.Column>
          <Table.Column>Bar</Table.Column>
          <Table.Column>Baz</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Foo 1</Table.Cell>
            <Table.Cell>Bar 1</Table.Cell>
            <Table.Cell>Baz 1</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );

    const table = wrapper.find('[role="grid"]').at(0);

    expect(table.props()["aria-label"]).toBe("Static Table");
    expect(table.find('[role="rowgroup"]').at(0).length).not.toBeNull();
    expect(table.find('[role="rowgroup"]').at(1).length).not.toBeNull();

    // get all headers
    const headers = table.find('[role="columnheader"]');

    expect(headers.length).toBe(3 * STITCHES_FACTOR); // is multiplied by 2 because of the stitches components

    headers.forEach((header) => {
      expect(header.props()["aria-sort"]).toBeFalsy();
      expect(header.props()["aria-describedby"]).toBeFalsy();
    });

    expect(headers.at(0 * STITCHES_FACTOR).text()).toBe("Foo");
    expect(headers.at(1 * STITCHES_FACTOR).text()).toBe("Bar");
    expect(headers.at(2 * STITCHES_FACTOR).text()).toBe("Baz");

    const bodyRowGroup = table.find('[role="rowgroup"]').at(1 * STITCHES_FACTOR);

    // get all rows
    const rows = bodyRowGroup.find('[role="row"]');

    expect(rows.length).toBe(2);

    // get body first cell (rowheader)
    const bodyFirstCell = rows.at(0).find('[role="rowheader"]').at(0);

    expect(bodyFirstCell.text()).toBe("Foo 1");

    // get all cells
    const cells = rows.at(0).find('[role="gridcell"]');

    expect(cells.length).toBe(2 * STITCHES_FACTOR);
  });

  it("should render a table with selection", () => {
    const wrapper = mount(
      <Table aria-label="Table with selection" selectionMode="multiple">
        <Table.Header>
          <Table.Column>Foo</Table.Column>
          <Table.Column>Bar</Table.Column>
          <Table.Column>Baz</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Foo 1</Table.Cell>
            <Table.Cell>Bar 1</Table.Cell>
            <Table.Cell>Baz 1</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );

    const table = wrapper.find('[role="grid"]').at(0);

    expect(table.props()["aria-label"]).toBe("Table with selection");
    expect(table.props()["aria-multiselectable"]).toBe("true");

    const bodyRowGroup = table.find('[role="rowgroup"]').at(1 * STITCHES_FACTOR);

    // select all checkbox
    let checkbox = table.find('[type="checkbox"]').at(0);

    expect(checkbox.props()["aria-label"]).toBe("Select All");

    // get all rows
    const rows = bodyRowGroup.find('[role="row"]');

    expect(rows.length).toBe(1 * STITCHES_FACTOR);

    // get body first cell (rowheader)
    const bodyFirstCell = rows.at(0).find('[role="rowheader"]').at(0);

    expect(bodyFirstCell.text()).toBe("Foo 1");

    const firstRowCheckbox = rows.at(0).find('[type="checkbox"]').at(0);

    expect(firstRowCheckbox.props()["aria-label"]).toBe("Select");
  });

  it("should render dynamic table", () => {
    const wrapper = mount(
      <Table aria-label="Dynamic Table">
        <Table.Header columns={columns}>
          {(column) => <Table.Column>{column.name}</Table.Column>}
        </Table.Header>
        <Table.Body items={items}>
          {(item: any) => (
            <Table.Row key={item.test}>
              <Table.Cell>{item.test}</Table.Cell>
              <Table.Cell>{item.foo}</Table.Cell>
              <Table.Cell>{item.bar}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>,
    );

    const table = wrapper.find('[role="grid"]').at(0);

    expect(table.props()["aria-label"]).toBe("Dynamic Table");

    const bodyRowGroup = table.find('[role="rowgroup"]').at(1 * STITCHES_FACTOR);

    // get all rows
    const rows = bodyRowGroup.find('[role="row"]');

    expect(rows.length).toBe(2 * STITCHES_FACTOR);

    // get body first cell (rowheader)
    const bodyFirstCell = rows.at(0).find('[role="rowheader"]').at(0);

    expect(bodyFirstCell.text()).toBe("Test 1");

    // get all cells
    const cells = rows.at(0).find('[role="gridcell"]');

    expect(cells.length).toBe(2 * STITCHES_FACTOR);
  });

  it("should render a dynamic table with selection", () => {
    const wrapper = mount(
      <Table aria-label="Dynamic Table with selection" selectionMode="multiple">
        <Table.Header columns={columns}>
          {(column) => <Table.Column>{column.name}</Table.Column>}
        </Table.Header>
        <Table.Body items={items}>
          {(item: any) => (
            <Table.Row key={item.test}>
              <Table.Cell>{item.test}</Table.Cell>
              <Table.Cell>{item.foo}</Table.Cell>
              <Table.Cell>{item.bar}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>,
    );

    const table = wrapper.find('[role="grid"]').at(0);

    expect(table.props()["aria-label"]).toBe("Dynamic Table with selection");
    expect(table.props()["aria-multiselectable"]).toBe("true");

    const bodyRowGroup = table.find('[role="rowgroup"]').at(1 * STITCHES_FACTOR);

    // select all checkbox
    let checkbox = table.find('[type="checkbox"]').at(0);

    expect(checkbox.props()["aria-label"]).toBe("Select All");

    // get all rows
    const rows = bodyRowGroup.find('[role="row"]');

    expect(rows.length).toBe(2 * STITCHES_FACTOR);

    // get body first cell (rowheader)
    const bodyFirstCell = rows.at(0).find('[role="rowheader"]').at(0);

    expect(bodyFirstCell.text()).toBe("Test 1");

    const firstRowCheckbox = rows.at(0).find('[type="checkbox"]').at(0);

    expect(firstRowCheckbox.props()["aria-label"]).toBe("Select");
  });

  it("should render a static table correctly with sorting", () => {
    const wrapper = mount(
      <Table aria-label="Test sorting table">
        <Table.Header>
          <Table.Column>NAME</Table.Column>
          <Table.Column allowsSorting>TYPE</Table.Column>
          <Table.Column allowsSorting>DATE MODIFIED</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row key="1">
            <Table.Cell>Games</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>6/7/2020</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );

    const table = wrapper.find('[role="grid"]').at(0);

    expect(table.props()["aria-label"]).toBe("Test sorting table");

    // get column headers
    const columnHeaders = table.find('[role="columnheader"]');

    expect(columnHeaders.length).toBe(3 * STITCHES_FACTOR);

    // check first column header
    const firstColumnHeader = columnHeaders.at(0 * STITCHES_FACTOR);

    expect(firstColumnHeader.text()).toBe("NAME");
    expect(firstColumnHeader.props()["aria-sort"]).toBeFalsy();

    // check second column header
    const secondColumnHeader = columnHeaders.at(1 * STITCHES_FACTOR);

    expect(secondColumnHeader.text()).toBe("TYPE");
    expect(secondColumnHeader.props()["aria-sort"]).toBe("none");

    // check third column header
    const thirdColumnHeader = columnHeaders.at(2 * STITCHES_FACTOR);

    expect(thirdColumnHeader.text()).toBe("DATE MODIFIED");
    expect(thirdColumnHeader.props()["aria-sort"]).toBe("none");

    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should set the proper aria-sort on an ascending sorted column header", () => {
    const wrapper = mount(
      <Table
        aria-label="Test sorting table"
        sortDescriptor={{column: "type", direction: "ascending"}}
      >
        <Table.Header>
          <Table.Column key="name">NAME</Table.Column>
          <Table.Column key="type" allowsSorting>
            TYPE
          </Table.Column>
          <Table.Column key="date_modified" allowsSorting>
            DATE MODIFIED
          </Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row key="1">
            <Table.Cell>Games</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>6/7/2020</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );

    const table = wrapper.find('[role="grid"]').at(0);

    expect(table.props()["aria-label"]).toBe("Test sorting table");

    // get column headers
    const columnHeaders = table.find('[role="columnheader"]');

    expect(columnHeaders.length).toBe(3 * STITCHES_FACTOR);

    // check first column header
    const firstColumnHeader = columnHeaders.at(0 * STITCHES_FACTOR);

    expect(firstColumnHeader.text()).toBe("NAME");
    expect(firstColumnHeader.props()["aria-sort"]).toBeFalsy();

    // check second column header
    const secondColumnHeader = columnHeaders.at(1 * STITCHES_FACTOR);

    expect(secondColumnHeader.text()).toBe("TYPE");
    expect(secondColumnHeader.props()["aria-sort"]).toBe("ascending");

    // check third column header
    const thirdColumnHeader = columnHeaders.at(2 * STITCHES_FACTOR);

    expect(thirdColumnHeader.text()).toBe("DATE MODIFIED");
    expect(thirdColumnHeader.props()["aria-sort"]).toBe("none");
  });

  it("should set the proper aria-sort on an descending sorted column header", () => {
    const wrapper = mount(
      <Table
        aria-label="Test sorting table"
        sortDescriptor={{column: "type", direction: "descending"}}
      >
        <Table.Header>
          <Table.Column key="name">NAME</Table.Column>
          <Table.Column key="type" allowsSorting>
            TYPE
          </Table.Column>
          <Table.Column key="date_modified" allowsSorting>
            DATE MODIFIED
          </Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row key="1">
            <Table.Cell>Games</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>6/7/2020</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );

    const table = wrapper.find('[role="grid"]').at(0);

    expect(table.props()["aria-label"]).toBe("Test sorting table");

    // get column headers
    const columnHeaders = table.find('[role="columnheader"]');

    expect(columnHeaders.length).toBe(3 * STITCHES_FACTOR);

    // check first column header
    const firstColumnHeader = columnHeaders.at(0 * STITCHES_FACTOR);

    expect(firstColumnHeader.text()).toBe("NAME");
    expect(firstColumnHeader.props()["aria-sort"]).toBeFalsy();

    // check second column header
    const secondColumnHeader = columnHeaders.at(1 * STITCHES_FACTOR);

    expect(secondColumnHeader.text()).toBe("TYPE");
    expect(secondColumnHeader.props()["aria-sort"]).toBe("descending");

    // check third column header
    const thirdColumnHeader = columnHeaders.at(2 * STITCHES_FACTOR);

    expect(thirdColumnHeader.text()).toBe("DATE MODIFIED");
    expect(thirdColumnHeader.props()["aria-sort"]).toBe("none");
  });
});
