import type { Ref } from "react";
declare function mergeRefs<T>(...refs: Ref<T>[]): (instance: T | null) => void;
export { mergeRefs };
export type { Ref };
