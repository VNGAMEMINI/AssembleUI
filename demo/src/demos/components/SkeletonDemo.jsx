import { Skeleton } from "@assemble-ui/react";

export function SkeletonDemo() {
  return (
    <div className="demo-preview">
      <div>
        <Skeleton
          variant="text"
          width="70%"
          height="1rem"
        />
        <Skeleton
          variant="text"
          width="50%"
          height="1rem"
        />
      </div>

      <Skeleton
        variant="circular"
        width="48px"
        height="48px"
      />

      <Skeleton
        variant="rectangular"
        width="100%"
        height="120px"
      />
    </div>
  );
}
