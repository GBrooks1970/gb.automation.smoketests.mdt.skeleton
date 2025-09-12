/**
 * Recursively checks that `actual` contains the key-value structure of `expected`.
 */
export const assertNestedObjectContainsSubset = (
    actual: Record<string, any>,
    expected: Record<string, any>): void => {

    Object.entries(expected).forEach(([key, value]) => {
        // 1) Confirm the key exists in the actual object
        expect(actual).to.have.property(key);

        // 2) If this value is an object (and not an array), recurse
        if (value !== null &&
            typeof value === 'object' &&
            !Array.isArray(value)) {
            assertNestedObjectContainsSubset(actual[key], value);
        } else {
            // 3) Otherwise, check for an exact match of the value
            expect(actual[key]).to.equal(value);
        }
    });
}


