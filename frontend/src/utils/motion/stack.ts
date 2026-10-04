
export const stackCards = {
  topOffset: 100,
  topStep: 10,
  scaleStep: 0.04,
} as const;

export const stackCardTop = (index: number) => stackCards.topOffset + index * stackCards.topStep;

export type TStackRange = { start: number; end: number };

export const stackCardRange = (index: number, card: HTMLElement, next: HTMLElement): TStackRange => {
  const nextFlowTop = next.getBoundingClientRect().top + window.scrollY;

  return {
    start: nextFlowTop - (stackCardTop(index) + card.offsetHeight),
    end: nextFlowTop - stackCardTop(index + 1),
  };
};

export const stackCardScaleAt = (scrollY: number, range: TStackRange | null) => {
  if (!range || range.end <= range.start) return 1;

  const t = Math.min(1, Math.max(0, (scrollY - range.start) / (range.end - range.start)));
  return 1 - t * stackCards.scaleStep;
};
