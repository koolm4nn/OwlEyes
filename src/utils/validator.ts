import { ZodType } from "zod";

/**
 * Utility class to validate/sanitizise input
 */

/**
 * Compares a zod schema to a given object
 * 
 * @param {ZodType<T>} schema - Comparator for object 
 * @param {unkown} data - Object to check 
 * @returns {success: true, data: unknown} If object satisfies schema
 * @returns {success: false, error: string} Otherwise
 */
export function validateInput<T>(
    schema: ZodType<T>,
    data: unknown
): {success: true, data: unknown} | {success: false, error: string}{
    const result = schema.safeParse(data);
    if(result.success){
        return { success: true, data: result.data};
    }
    
    return {
        success: false,
        error: result.error.message
    }
}

/**
 * Removes leading/following tab or spaces and sets string to lowercase
 * 
 * @param {string} string - string to normalize 
 * @returns 
 */
export function normalizeString(string: string) : string{
    return string.trim().toLowerCase();
}