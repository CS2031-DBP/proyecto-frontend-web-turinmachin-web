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
