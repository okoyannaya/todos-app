import { ITodoItem } from "@containers/redux/types";

export const isSectionInViewport = (el?: Element | null): boolean => {
  if (!el) return false;

  const rect = el.getBoundingClientRect();

  return (
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const chunkArray = (array: ITodoItem[], size: number): ITodoItem[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};
