export enum ErrorCodes {
    NOT_FOUND = 'Not found',
    OUT_OF_RANGE = 'Out of range',
}

export const NOT_FOUND_ERROR = new Error(ErrorCodes.NOT_FOUND);
export const OUT_OF_RANGE_ERROR = new Error(ErrorCodes.OUT_OF_RANGE);
