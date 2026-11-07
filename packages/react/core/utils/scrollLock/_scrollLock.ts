let lockCount = 0;
let previousOverflow = "";
let lockedBody: HTMLElement | null = null;

export function acquireScrollLock(): () => void {
  if (typeof document === "undefined" || !document.body) {
    return () => {};
  }

  const body = document.body;

  if (lockCount === 0) {
    lockedBody = body;
    previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
  }

  lockCount += 1;

  let released = false;

  return () => {
    if (released) {
      return;
    }

    released = true;
    lockCount = Math.max(0, lockCount - 1);

    if (lockCount === 0 && lockedBody) {
      lockedBody.style.overflow = previousOverflow;
      lockedBody = null;
      previousOverflow = "";
    }
  };
}
