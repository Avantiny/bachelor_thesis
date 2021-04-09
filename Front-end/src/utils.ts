export const isNilOrEmpty = (val: any): boolean =>
  val === undefined || val === NaN || val === null || val === '' || val === false
