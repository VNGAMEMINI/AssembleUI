type Value = string | number | boolean | undefined | null;
type Arg = Value | Arg[];

function classNames(...args: Arg[]): string {
  return args
    .flat(Infinity)
    .filter(
      (item): item is string | number =>
        typeof item === "string" || typeof item === "number",
    )
    .map(String)
    .join(" ");
}

export { classNames };
