export const pick = <T, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Pick<T, K> => {
  const out = {} as Pick<T, K>;

  keys.forEach((key) => {
    out[key] = obj[key];
  });
  return out;
};

export const removeUndefined = <T extends Record<string, unknown>>(
  obj: T,
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as Partial<T>;
};
