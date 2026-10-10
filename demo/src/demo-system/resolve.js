import {
  getDemoByPath,
} from "./registry";

export function resolveDemo(path) {
  return (
    getDemoByPath(path) ??
    getDemoByPath("/components/container")
  );
}
