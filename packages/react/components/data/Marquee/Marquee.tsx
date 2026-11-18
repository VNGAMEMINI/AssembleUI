import {
  forwardRef,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  classNames,
} from "../../../core/utils";

import type {
  Ref,
} from "react";

import type {
  MarqueeProps,
} from "./Marquee.types";

export const Marquee = forwardRef<
  HTMLDivElement,
  MarqueeProps
>(
  (
    {
      children,
      speed = 30,
      gap = 20,
      direction = "left",
      pauseOnHover = false,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const containerRef =
      useRef<HTMLDivElement>(null);

    const measurementRef =
      useRef<HTMLDivElement>(null);

    const groupRef =
      useRef<HTMLDivElement>(null);

    const [repeatCount, setRepeatCount] =
      useState(1);

    const [duration, setDuration] =
      useState<number | null>(null);

    const normalizedGap =
      typeof gap === "number"
        ? `${gap}px`
        : gap;

    const validSpeed =
      Number.isFinite(speed) && speed > 0;

    useEffect(() => {
      const container =
        containerRef.current;

      const measurement =
        measurementRef.current;

      if (!container || !measurement) {
        return;
      }

      const updateRepeatCount = () => {
        const containerWidth =
          container.clientWidth;

        const contentWidth =
          measurement.getBoundingClientRect().width;

        if (
          containerWidth <= 0 ||
          contentWidth <= 0
        ) {
          return;
        }

        const nextCount = Math.max(
          1,
          Math.ceil(
            containerWidth / contentWidth,
          ),
        );

        setRepeatCount((current) =>
          current === nextCount
            ? current
            : nextCount,
        );
      };

      updateRepeatCount();

      const observer =
        typeof ResizeObserver !== "undefined"
          ? new ResizeObserver(
              updateRepeatCount,
            )
          : null;

      observer?.observe(container);
      observer?.observe(measurement);

      if (!observer) {
        window.addEventListener(
          "resize",
          updateRepeatCount,
        );
      }

      return () => {
        observer?.disconnect();

        if (!observer) {
          window.removeEventListener(
            "resize",
            updateRepeatCount,
          );
        }
      };
    }, [children, gap]);

    useEffect(() => {
      const group =
        groupRef.current;

      if (!group || !validSpeed) {
        setDuration(null);
        return;
      }

      const updateDuration = () => {
        const width =
          group.getBoundingClientRect().width;

        if (width <= 0) {
          setDuration(null);
          return;
        }

        setDuration(width / speed);
      };

      updateDuration();

      const observer =
        typeof ResizeObserver !== "undefined"
          ? new ResizeObserver(
              updateDuration,
            )
          : null;

      observer?.observe(group);

      if (!observer) {
        window.addEventListener(
          "resize",
          updateDuration,
        );
      }

      return () => {
        observer?.disconnect();

        if (!observer) {
          window.removeEventListener(
            "resize",
            updateDuration,
          );
        }
      };
    }, [
      speed,
      repeatCount,
      gap,
      children,
      validSpeed,
    ]);

    const renderGroup = (
      hidden = false,
      groupRef?: Ref<HTMLDivElement>,
    ) => (
      <div
        ref={groupRef}
        className="aui-marquee__group"
        aria-hidden={hidden || undefined}
        inert={hidden || undefined}
      >
        {Array.from(
          { length: repeatCount },
          (_, index) => (
            <Fragment key={index}>
              <div className="aui-marquee__items">
                {children}
              </div>
            </Fragment>
          ),
        )}
      </div>
    );

    return (
      <div
        {...props}
        ref={(node) => {
          containerRef.current = node;

          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={classNames(
          "aui-marquee",
          `aui-marquee--${direction}`,
          pauseOnHover &&
            "aui-marquee--pause-on-hover",
          duration !== null &&
            "aui-marquee--ready",
          className,
        )}
        style={{
          ...style,
          "--aui-marquee-gap":
            normalizedGap,
          "--aui-marquee-duration":
            duration !== null
              ? `${duration}s`
              : "0s",
        } as React.CSSProperties}
      >
        <div
          ref={measurementRef}
          className="aui-marquee__measurement"
          aria-hidden="true"
          inert
        >
          <div className="aui-marquee__items">
            {children}
          </div>
        </div>

        <div className="aui-marquee__track">
          {renderGroup(false, groupRef)}
          {renderGroup(true)}
        </div>
      </div>
    );
  },
);

Marquee.displayName = "Marquee";
