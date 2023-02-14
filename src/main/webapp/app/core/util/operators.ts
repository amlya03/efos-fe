/*
 * Function used to workaround https://github.com/microsoft/TypeScript/issues/16069
 * es2019 alternative `const filteredArr = myArr.flatMap((x) => x ? x : []);`
 */
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export function isPresent<T>(t: T | undefined | null | void): t is T {
  return t !== undefined && t !== null;
}

export const filterNaN = (input: number): number => (isNaN(input) ? 0 : input);
