export enum ERROR_CODES {

    NOT_FOUND = 'Not found',

}


export const NOT_FOUND_ERROR = new Error(ERROR_CODES.NOT_FOUND);
