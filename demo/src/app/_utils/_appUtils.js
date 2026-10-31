export function getCurrentPath() {
  const path = window.location.hash.replace(/^#/, "");
  return path || "/components/container";
}

export function formatType(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}
