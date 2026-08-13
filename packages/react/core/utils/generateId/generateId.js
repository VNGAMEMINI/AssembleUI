let counter = 0;

export function generateId(
  prefix = "aui"
) {
  counter += 1;

  return `${prefix}-${counter}`;
}
