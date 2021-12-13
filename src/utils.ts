export function arrayToString(array: string[]) {
  return array.map((element) => `'${element}'`);
}
