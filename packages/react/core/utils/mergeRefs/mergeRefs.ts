import type { Ref, RefCallback } from "react";

function mergeRefs<T>(...refs: Ref<T>[]): RefCallback<T> {
  return (instance) => {
    if (instance === null) {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(null);
          return;
        }

        if (ref !== null) {
          ref.current = null;
        }
      });

      return;
    }

    const cleanups: Array<() => void> = [];

    refs.forEach((ref) => {
      if (typeof ref === "function") {
        const cleanup = ref(instance);

        if (typeof cleanup === "function") {
          cleanups.push(cleanup);
        } else {
          cleanups.push(() => ref(null));
        }

        return;
      }

      if (ref !== null) {
        ref.current = instance;
        cleanups.push(() => {
          ref.current = null;
        });
      }
    });

    let released = false;

    return () => {
      if (released) {
        return;
      }

      released = true;

      cleanups.forEach((cleanup) => cleanup());
    };
  };
}

export { mergeRefs };
export type { Ref };
