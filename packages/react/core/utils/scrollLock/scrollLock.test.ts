import {
  afterEach,
  describe,
  expect,
  it,
} from "vitest";

import { acquireScrollLock } from "./_scrollLock";

describe("acquireScrollLock", () => {
  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("locks body scrolling", () => {
    const release = acquireScrollLock();

    expect(document.body.style.overflow).toBe("hidden");

    release();

    expect(document.body.style.overflow).toBe("");
  });

  it("restores the previous overflow value", () => {
    document.body.style.overflow = "auto";

    const release = acquireScrollLock();

    expect(document.body.style.overflow).toBe("hidden");

    release();

    expect(document.body.style.overflow).toBe("auto");
  });

  it("keeps scrolling locked until every lock is released", () => {
    const releaseFirst = acquireScrollLock();
    const releaseSecond = acquireScrollLock();

    releaseFirst();

    expect(document.body.style.overflow).toBe("hidden");

    releaseSecond();

    expect(document.body.style.overflow).toBe("");
  });

  it("restores scrolling regardless of release order", () => {
    document.body.style.overflow = "auto";

    const releaseFirst = acquireScrollLock();
    const releaseSecond = acquireScrollLock();

    releaseSecond();

    expect(document.body.style.overflow).toBe("hidden");

    releaseFirst();

    expect(document.body.style.overflow).toBe("auto");
  });

  it("does not release the same lock more than once", () => {
    const releaseFirst = acquireScrollLock();
    const releaseSecond = acquireScrollLock();

    releaseFirst();
    releaseFirst();

    expect(document.body.style.overflow).toBe("hidden");

    releaseSecond();

    expect(document.body.style.overflow).toBe("");
  });

  it("supports acquiring another lock after all locks are released", () => {
    const releaseFirst = acquireScrollLock();

    releaseFirst();

    document.body.style.overflow = "scroll";

    const releaseSecond = acquireScrollLock();

    expect(document.body.style.overflow).toBe("hidden");

    releaseSecond();

    expect(document.body.style.overflow).toBe("scroll");
  });
});
