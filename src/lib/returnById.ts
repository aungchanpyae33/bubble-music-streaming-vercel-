export function mapById<T extends { id: string }>(
  array: T[] | null | undefined,
  idArray: string[]
) {
  if (!array) return {} as Record<string, T>;
  return array.reduce((acc, item) => {
    acc[item.id] = item;
    idArray.push(item.id);
    return acc;
  }, {} as Record<string, T>);
}
type UnknownRecord = Record<string, unknown>;

export function deepMapById<T extends UnknownRecord>(
  obj: T,
  paths: string[]
): T {
  const result: UnknownRecord = { ...obj };

  paths.forEach((path) => {
    const keys = path.split(".");
    let current: UnknownRecord = result;

    for (let i = 0; i < keys.length - 1; i++) {
      const value = current[keys[i]];
      if (typeof value !== "object" || value === null) return;
      current = value as UnknownRecord;
    }

    const lastKey = keys[keys.length - 1];
    const secKey = keys[keys.length - 2] ?? keys[0];

    const array = current[lastKey];

    if (Array.isArray(array)) {
      const idArray: string[] = [];

      current[lastKey] = mapById(array as { id: string }[], idArray);

      const parent = result[secKey];
      if (typeof parent === "object" && parent !== null) {
        (parent as UnknownRecord).idArray = idArray;
      }
    }
  });

  return result as T;
}
