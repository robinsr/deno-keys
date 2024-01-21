


function unique<T>(...items: T[]): T[] {
  if (Array.isArray(items[0])) {
    return Array.from(new Set(items[0]));
  } else {
    return Array.from(new Set(items));
  }
}

export { unique }