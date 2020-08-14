/**
 * Error codes of {@link FlickingError}
 * @name ERROR_CODES
 * @memberof Constants
 * @type object
 * @property {number} WRONG_TYPE 0
 * @property {number} ELEMENT_NOT_FOUND 1
 * @property {number} VAL_MUST_NOT_NULL 2
 */
export const CODES: {
  [key in keyof typeof MESSAGES]: number;
} = {
  WRONG_TYPE: 0,
  ELEMENT_NOT_FOUND: 1,
  VAL_MUST_NOT_NULL: 2,
};

export const MESSAGES = {
  WRONG_TYPE: (val: any, types: string[]) => `${val}(${typeof val}) is not a ${types.map(type => `"${type}"`).join(" or ")}.`,
  ELEMENT_NOT_FOUND: (query: string) => `Element with selector "${query}" not found.`,
  VAL_MUST_NOT_NULL: (val: any, name: string) => `${name} should be provided. Given: ${val}`,
};
