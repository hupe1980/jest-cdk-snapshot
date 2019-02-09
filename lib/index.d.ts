/// <reference types="jest" />
declare global {
    namespace jest {
        interface Matchers<R> {
            toMatchCdkSnapshot(): R;
        }
    }
}
export declare const toMatchCdkSnapshot: jest.CustomMatcher;
