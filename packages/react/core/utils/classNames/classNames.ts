type ClassValue = string | number | boolean | null | undefined | ClassValue[];

function classNames(...values: ClassValue[]): string {
  const result: string[] = [];

  const append = (value: ClassValue): void => {
    if (Array.isArray(value)) {
      value.forEach(append);
      return;
    }

    if (typeof value === "string" || typeof value === "number") {
      result.push(String(value));
    }
  };

  values.forEach(append);
  return result.join(" ");
}

export { classNames };
export type { ClassValue };
