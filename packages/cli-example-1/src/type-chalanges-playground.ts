type Expect<T extends true> = T
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

type MergeInsertions<T> = T extends object ? { [K in keyof T]: MergeInsertions<T[K]> } : T

type Alike<X, Y> = (<T>() => T extends MergeInsertions<X> ? 1 : 2) extends <T>() => T extends MergeInsertions<Y> ? 1 : 2
  ? true
  : false

/* -------------------------------------------------------------------------------------------------------------- */

type FindEles<T extends unknown[]> = T extends [infer F, ...infer R]
  ? F extends R[number]
    ? FindEles<R>
    : [F, ...FindEles<R>]
  : []

/* -------------------------------------------------------------------------------------------------------------- */

// type cases = [
//   Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
//   Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
//   Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
//   Expect<Equal<FindEles<[1, 2, number]>, [1, 2, number]>>,
//   Expect<Equal<FindEles<[1, 2, number, number]>, [1, 2]>>,
// ]
