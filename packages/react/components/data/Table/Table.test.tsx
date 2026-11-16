import {
  createRef,
} from "react";

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
  it("renders the table title as a caption", () => {
    render(
      <Table title="Users">
        <Table.Row>
          <Table.Head>Name</Table.Head>
        </Table.Row>
      </Table>,
    );

    expect(
      screen.getByRole("table"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Users"),
    ).toBeInTheDocument();
  });

  it("automatically groups header and body rows", () => {
    render(
      <Table title="Users">
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Email</Table.Head>
        </Table.Row>

        <Table.Row>
          <Table.Cell>Alice</Table.Cell>
          <Table.Cell>alice@example.com</Table.Cell>
        </Table.Row>
      </Table>,
    );

    const table = screen.getByRole("table");
    const header = table.querySelector("thead");

    expect(header).not.toBeNull();

    expect(header).toContainElement(
      screen.getByRole("columnheader", {
        name: "Name",
      }),
    );

    expect(
      screen.getByRole("cell", {
        name: "Alice",
      }),
    ).toBeInTheDocument();

    expect(
      table.querySelectorAll("thead > tr"),
    ).toHaveLength(1);

    expect(
      table.querySelectorAll("tbody > tr"),
    ).toHaveLength(1);
  });

  it("supports multiple header rows", () => {
    render(
      <Table>
        <Table.Row>
          <Table.Head>Group</Table.Head>
        </Table.Row>

        <Table.Row>
          <Table.Head>Name</Table.Head>
        </Table.Row>

        <Table.Row>
          <Table.Cell>Alice</Table.Cell>
        </Table.Row>
      </Table>,
    );

    const table = screen.getByRole("table");

    expect(
      table.querySelectorAll("thead > tr"),
    ).toHaveLength(2);
  });

  it("applies default variant and density", () => {
    render(<Table />);

    expect(
      screen.getByRole("table"),
    ).toHaveClass(
      "aui-table--default",
      "aui-table--comfortable",
    );
  });

  it("supports striped variant", () => {
    render(<Table variant="striped" />);

    expect(
      screen.getByRole("table"),
    ).toHaveClass("aui-table--striped");
  });

  it("supports compact density", () => {
    render(<Table density="compact" />);

    expect(
      screen.getByRole("table"),
    ).toHaveClass("aui-table--compact");
  });

  it("supports bordered and hoverable", () => {
    render(
      <Table bordered hoverable />,
    );

    expect(
      screen.getByRole("table"),
    ).toHaveClass(
      "aui-table--bordered",
      "aui-table--hoverable",
    );
  });

  it("forwards native table attributes", () => {
    render(
      <Table
        data-testid="users-table"
        aria-label="Users"
      />,
    );

    expect(
      screen.getByTestId("users-table"),
    ).toHaveAttribute("aria-label", "Users");
  });

  it("forwards a ref to the table", () => {
    const ref = createRef<HTMLTableElement>();

    render(<Table ref={ref} />);

    expect(ref.current).toBeInstanceOf(
      HTMLTableElement,
    );
  });

  it("supports custom class names", () => {
    render(
      <Table className="custom-table" />,
    );

    expect(
      screen.getByRole("table"),
    ).toHaveClass("custom-table");
  });

  it("supports Table.Caption", () => {
    render(
      <Table>
        <Table.Caption>Team members</Table.Caption>
      </Table>,
    );

    expect(
      screen.getByText("Team members"),
    ).toBeInTheDocument();
  });

  it("forwards attributes and class names to rows and cells", () => {
    render(
      <Table>
        <Table.Row data-testid="table-row">
          <Table.Head
            data-testid="table-head"
            className="custom-head"
          >
            Name
          </Table.Head>

          <Table.Cell
            data-testid="table-cell"
            className="custom-cell"
          >
            Alice
          </Table.Cell>
        </Table.Row>
      </Table>,
    );

    expect(
      screen.getByTestId("table-row"),
    ).toHaveClass("aui-table__row");

    expect(
      screen.getByTestId("table-head"),
    ).toHaveClass(
      "aui-table__head",
      "custom-head",
    );

    expect(
      screen.getByTestId("table-cell"),
    ).toHaveClass(
      "aui-table__cell",
      "custom-cell",
    );
  });

  it("forwards refs to compound elements", () => {
    const rowRef = createRef<HTMLTableRowElement>();
    const headRef = createRef<HTMLTableCellElement>();
    const cellRef = createRef<HTMLTableCellElement>();

    render(
      <Table>
        <Table.Row ref={rowRef}>
          <Table.Head ref={headRef}>
            Name
          </Table.Head>

          <Table.Cell ref={cellRef}>
            Alice
          </Table.Cell>
        </Table.Row>
      </Table>,
    );

    expect(rowRef.current).toBeInstanceOf(
      HTMLTableRowElement,
    );

    expect(headRef.current).toBeInstanceOf(
      HTMLTableCellElement,
    );

    expect(cellRef.current).toBeInstanceOf(
      HTMLTableCellElement,
    );
  });

  it("supports wrapper attributes and class names", () => {
    render(
      <Table
        wrapperClassName="custom-wrapper"
        wrapperProps={{
          className: "wrapper-props-class",
          "data-testid": "table-wrapper",
        }}
      />,
    );

    expect(
      screen.getByTestId("table-wrapper"),
    ).toHaveClass(
      "aui-table__wrapper",
      "custom-wrapper",
      "wrapper-props-class",
    );
  });

  it("defaults column headers to scope col", () => {
    render(
      <Table>
        <Table.Row>
          <Table.Head>Name</Table.Head>
        </Table.Row>
      </Table>,
    );

    expect(
      screen.getByRole("columnheader"),
    ).toHaveAttribute("scope", "col");
  });
});
