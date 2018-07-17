export interface LazyResult<T> {
  done: boolean;
  hasNext: boolean;
  hasMany?: boolean;
  next?: T;
}

export function _reduceLazy<T, K>(
  array: T[],
  lazy: (item: T, index?: number, array?: T[]) => LazyResult<K>,
  indexed?: boolean
) {
  return array.reduce((acc, item, index) => {
    const result = indexed ? lazy(item, index, array) : lazy(item);
    if (result.hasNext) {
      acc.push(result.next);
    }
    return acc;
  }, []);
}
