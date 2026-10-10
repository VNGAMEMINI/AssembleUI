import {
  ActionMenu,
} from "@assemble-ui/react";

export function ActionMenuDemo() {
  return (
    <div className="demo-preview">
      <ActionMenu
        aria-label="ActionMenu demo"
        items={[
          {
            id: "home",
            type: "link",
            label: "Trang chủ",
            href: "/",
          },
          {
            id: "products",
            type: "link",
            label: "Sản phẩm",
            href: "/products",
          },
          {
            id: "github",
            type: "link",
            label: "GitHub",
            href: "https://github.com/VNGAMEMINI/AssembleUI",
            external: true,
          },
          {
            id: "test-action",
            type: "action",
            label: "Test action",
            onClick: () => {
              window.alert(
                "ActionMenu action hoạt động.",
              );
            },
          },
        ]}
      />
    </div>
  );
}
