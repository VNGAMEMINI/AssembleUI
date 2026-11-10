import {
  render,
  screen,
} from "@testing-library/react";

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  Table,
} from "./Table";

describe("Table", () => {
  it("renders table content", () => {
    render(
      <Table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Alice</td>
            <td>Active</td>
          </tr>
        </tbody>
      </Table>,
    );

    expect(
      screen.getByRole("table"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("columnheader", {
        name: "Name",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("cell", {
        name: "Alice",
      }),
    ).toBeInTheDocument();
  });

  it("applies the striped variant", () => {
    render(
      <Table variant="striped">
        <tbody>
          <tr>
            <td>Row 1</td>
          </tr>
        </tbody>
      </Table>,
    );

    expect(
      screen.getByRole("table"),
    ).toHaveClass("aui-table--striped");
  });

  it("applies compact density", () => {
    render(
      <Table density="compact">
        <tbody>
          <tr>
            <td>Compact</td>
          </tr>
        </tbody>
      </Table>,
    );

    expect(
      screen.getByRole("table"),
    ).toHaveClass("aui-table--compact");
  });

  it("applies bordered styling", () => {
    render(
      <Table bordered>
        <tbody>
          <tr>
            <td>Bordered</td>
          </tr>
        </tbody>
      </Table>,
    );

    expect(
      screen.getByRole("table"),
    ).toHaveClass("aui-table--bordered");
  });

  it("forwards native table attributes", () => {
    render(
      <Table
        data-testid="users-table"
        aria-label="Users"
      >
        <tbody>
          <tr>
            <td>User</td>
          </tr>
        </tbody>
      </Table>,
    );

    const table =
      screen.getByTestId("users-table");

    expect(table).toHaveAttribute(
      "aria-label",
      "Users",
    );
  });

  it("forwards a ref to the table element", () => {
    let tableElement:
      | HTMLTableElement
      | null = null;

    render(
      <Table
        ref={(element) => {
          tableElement = element;
        }}
      >
        <tbody>
          <tr>
            <td>User</td>
          </tr>
        </tbody>
      </Table>,
    );

    expect(tableElement).toBeInstanceOf(
      HTMLTableElement,
    );
  });

  it("supports a caption", () => {
    render(
      <Table>
        <caption>Users</caption>

        <tbody>
          <tr>
            <td>Alice</td>
          </tr>
        </tbody>
      </Table>,
    );

    expect(
      screen.getByText("Users"),
    ).toBeInTheDocument();
  });

  it("supports the default variant and density", () => {
    render(
      <Table>
        <tbody>
          <tr>
            <td>Default</td>
          </tr>
        </tbody>
      </Table>,
    );

    const table =
      screen.getByRole("table");

    expect(table).toHaveClass(
      "aui-table--default",
    );

    expect(table).toHaveClass(
      "aui-table--comfortable",
    );
  });

  it("allows custom class names", () => {
    render(
      <Table className="custom-table">
        <tbody>
          <tr>
            <td>Custom</td>
          </tr>
        </tbody>
      </Table>,
    );

    expect(
      screen.getByRole("table"),
    ).toHaveClass("custom-table");
  });
});
