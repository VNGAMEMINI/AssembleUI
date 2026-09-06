import type { Ref } from "react";

function mergeRefs<T>(...refs: Ref<T>[]): (instance: T | null) => void {
  return (instance) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(instance);
        return;
      }

      if (ref !== null) {
        (ref as { current: T | null }).current = instance;
      }
    });
  };
}

export { mergeRefs };
export type { Ref };
