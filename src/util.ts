export const isProdEnv = process.env.NODE_ENV === 'production';

export const mergeToLeft = <T>(left: T[], right: T[], uniqueId: keyof T): T[] => {
  const draft = [...left, ...right].reduce(
    (prev, curr) => ({
      ...prev,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [curr[uniqueId] as any]: curr,
    }),
    {},
  );

  return Object.values(draft);
};

export const randomBetween = (min: number, max: number, ignore?: number | number[]): number => {
  const ignoreLength = typeof ignore === 'undefined' ? 0 : typeof ignore === 'number' ? 1 : ignore.length;

  if (min >= max || ignoreLength >= max - min) {
    throw new Error(`Invalid operation:\n\n${JSON.stringify({ min, max, ignore }, undefined, 2)}`);
  }

  let random = Math.floor(Math.random() * (max - min + 1) + min);

  if (typeof ignore === 'undefined' || (ignore instanceof Array && !ignore.length)) {
    return random;
  } else if (typeof ignore === 'number') {
    while (random === ignore) {
      random = Math.floor(Math.random() * (max - min + 1) + min);
    }

    return random;
  } else if (ignore instanceof Array && typeof ignore[0] === 'number') {
    while (ignore.indexOf(random) !== -1) {
      random = Math.floor(Math.random() * (max - min + 1) + min);
    }

    return random;
  }

  throw new Error(`Invalid operation:\n\n${JSON.stringify({ min, max, ignore }, undefined, 2)}`);
};
