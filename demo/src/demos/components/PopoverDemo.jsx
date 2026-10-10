import { Button, Popover } from "@assemble-ui/react";

export function PopoverDemo() {
  return (
    <div className="demo-preview">
      <Popover
        trigger={<Button>Thông tin</Button>}
        placement="bottom"
      >
        <div>
          <strong>Popover</strong>
          <p>
            Nội dung Popover được render bên ngoài cây DOM hiện
            tại thông qua portal.
          </p>
        </div>
      </Popover>
    </div>
  );
}
