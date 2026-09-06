import type { ForwardedRef } from "react";

type Ref<T> = ForwardedRef<T> | ((instance: T) => void) | null;

function mergeRefs<T>(...refs: Ref<T>[]): (instance: T | null) => void {
  return (instance: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(instance);
      } else if (ref && "current" in ref) {
        ref.current = instance;
      }
    });
  };
}

export { mergeRefs };
export type { Ref };
