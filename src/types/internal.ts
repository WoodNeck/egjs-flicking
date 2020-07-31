export type ValueOf<T> = T[keyof T];

type Join<T1, T2> = T1 & T2;
export type Spread<T1, T2> = {
  [K in keyof Join<T1, T2>]: Join<T1, T2>[K];
};
