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
            type: "link",
            label: "Trang chủ",
            href: "/",
          },
          {
            type: "link",
            label: "Sản phẩm",
            href: "/products",
          },
          {
            type: "link",
            label: "GitHub",
            href: "https://github.com/VNGAMEMINI/AssembleUI",
            external: true,
          },
          {
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
