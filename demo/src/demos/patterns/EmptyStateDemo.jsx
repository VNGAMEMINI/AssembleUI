import {
  Button,
  EmptyState,
  Icon,
} from "@assemble-ui/react";

export function EmptyStateDemo() {
  return (
    <EmptyState
      heading="No users found"
      description="Try changing your search or create a new user."
      icon={<Icon name="search" />}
      action={
        <Button type="button">
          Create user
        </Button>
      }
    />
  );
}
