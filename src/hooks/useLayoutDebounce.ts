import { useLayoutEffect } from 'react';

export function useLayoutDebounce(
  fn: () => any,
  ms: number = 0,
  args: any[] = []
) {
  useLayoutEffect(() => {
    const handle = setTimeout(fn.bind(null, args), ms);

    return () => {
      clearTimeout(handle);
    };
  }, args);
}
