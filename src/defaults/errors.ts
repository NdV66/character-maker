export enum ERROR_CODES {
    NOT_FOUND = 'Not found',
    OUT_OF_RANGE = 'Out of range',
}

export const NOT_FOUND_ERROR = new Error(ERROR_CODES.NOT_FOUND);
export const OUT_OF_RANGE_ERROR = new Error(ERROR_CODES.OUT_OF_RANGE);
