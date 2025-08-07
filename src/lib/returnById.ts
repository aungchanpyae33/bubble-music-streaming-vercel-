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

export function deepMapById<T>(obj: T, paths: string[]) {
  const result: any = { ...obj };

  paths.forEach((path) => {
    const keys = path.split(".");
    let current: any = result;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) return;
      current = current[keys[i]];
    }
    const lastKey = keys[keys.length - 1];
    const secKey = keys[keys.length - 2] || keys[0];
    const array = current[lastKey] as { id: string }[] | null | undefined;

    if (Array.isArray(array)) {
      let idArray: string[] = [];
      current[lastKey] = mapById(array, idArray);
      result[`${secKey}`].idArray = idArray;
    }
  });

  return result;
}
