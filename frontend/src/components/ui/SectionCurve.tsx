type TSectionCurveFill = 'fill-thrird' | 'fill-fourth' | 'fill-primary' | 'fill-secondary';

type Props = {
  fill: TSectionCurveFill;
  direction?: "top" | "bottom";
};

export const SectionCurve = ({ fill, direction = "top" }: Props) => {
  const isTop = direction === "top";

  const position = isTop
    ? "top-0 -translate-y-[2px]"
    : "bottom-0 translate-y-[2px]";

  const desktopPath = isTop
    ? "M0 0 H300 C340 0 344 30 384 30 H1536 C1576 30 1580 0 1620 0 H1920 Z"
    : "M0 60 H300 C340 60 344 30 384 30 H1536 C1576 30 1580 60 1620 60 H1920 Z";

  const mobilePath = isTop
    ? "M0 0 H90 C102 0 103 15 115 15 H285 C297 15 298 0 310 0 H400 Z"
    : "M0 30 H90 C102 30 103 15 115 15 H285 C297 15 298 30 310 30 H400 Z";

  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 z-20 hidden h-15 leading-0 lg:block ${position}`}
      >
        <svg
          viewBox="0 0 1920 60"
          preserveAspectRatio="none"
          className={`absolute -top-px block h-[calc(100%+2px)] w-full ${fill}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={desktopPath} />
        </svg>
      </div>

      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 z-20 block h-6 leading-0 lg:hidden ${position}`}
      >
        <svg
          viewBox="0 0 400 30"
          preserveAspectRatio="none"
          className={`absolute -top-px block h-[calc(100%+2px)] w-full ${fill}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={mobilePath} />
        </svg>
      </div>
    </>
  );
};