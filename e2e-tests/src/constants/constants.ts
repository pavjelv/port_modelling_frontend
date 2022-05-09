export const HTTP_TIMEOUT = 3000;
export const DEFAULT_TIMEOUT = 7000;
const TEST_EXECUTOR_COUNT = 1;

export function repeatTest(testName: string, fn:(t: TestController) => Promise<any>) {
    for (let i = 0; i < TEST_EXECUTOR_COUNT; i++) {
        test(`${i}:${testName}`, fn);
    }
}
