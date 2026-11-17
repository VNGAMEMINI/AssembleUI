import {
  Badge,
  Button,
  ProfileHeader,
} from "@assemble-ui/react";

export function ProfileHeaderDemo() {
  return (
    <ProfileHeader
      name="Nguyen Van A"
      description="Frontend Developer"
      avatarSrc="https://i.pravatar.cc/128?img=12"
      badge={<Badge>Pro</Badge>}
      action={
        <Button type="button">
          Edit profile
        </Button>
      }
    />
  );
}
