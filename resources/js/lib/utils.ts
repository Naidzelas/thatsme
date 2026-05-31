import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const normalizeTechnology = (technology: string) =>
    technology
        .toLocaleLowerCase('en-US')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

export const getNormalizedQueryValues = (
    queryValue: string | (string | null)[] | null | undefined,
) => {
    const queryValues = Array.isArray(queryValue) ? queryValue : [queryValue];

    return queryValues
        .filter((value): value is string => typeof value === 'string')
        .map((value) => normalizeTechnology(value))
        .filter(Boolean);
};

export const areStringArraysEqual = (first: string[], second: string[]) => {
    if (first.length !== second.length) {
        return false;
    }

    return first.every((value, index) => value === second[index]);
};
