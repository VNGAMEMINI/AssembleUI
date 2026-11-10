import {
  render,
  screen,
} from "@testing-library/react";

import { DataGrid } from "./DataGrid";

type User = {
  id: number;
  name: string;
  email: string;
};

const rows: User[] = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
  },
];

const columns = [
  {
    key: "name",
    header: "Name",
  },
  {
    key: "email",
    header: "Email",
  },
];

describe("DataGrid", () => {
  it("renders columns and rows", () => {
    render(
      <DataGrid
        columns={columns}
        rows={rows}
        rowKey="id"
      />,
    );

    expect(
      screen.getByRole("columnheader", {
        name: "Name",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("columnheader", {
        name: "Email",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("cell", {
        name: "Alice",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("cell", {
        name: "alice@example.com",
      }),
    ).toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(
      <DataGrid
        columns={columns}
        rows={[]}
        emptyState="Nothing found"
      />,
    );

    expect(
      screen.getByText("Nothing found"),
    ).toBeInTheDocument();
  });

  it("supports custom cell rendering", () => {
    render(
      <DataGrid
        columns={[
          {
            key: "name",
            header: "User",
            render: (value) => (
              <strong>{String(value)}</strong>
            ),
          },
        ]}
        rows={rows}
        rowKey="id"
      />,
    );

    expect(
      screen.getByRole("cell", {
        name: "Alice",
      }),
    ).toBeInTheDocument();
  });
});
