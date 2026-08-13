export function mergeRefs(
  ...refs
) {
  return (value) => {

    refs.forEach((ref) => {

      if (!ref) return;

      if (
        typeof ref ===
        "function"
      ) {
        ref(value);
      } else {
        ref.current =
          value;
      }

    });

  };
}
