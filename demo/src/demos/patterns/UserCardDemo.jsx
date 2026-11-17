import {
  Button,
  UserCard,
} from "@assemble-ui/react";

export function UserCardDemo() {
  return (
    <div className="demo-preview">
      <UserCard
        name="AssembleUI"
        description="Composition-first React UI library."
        badge="Pattern"
        action={
          <Button type="button">
            Xem thêm
          </Button>
        }
      />
    </div>
  );
}
