// Function to find the Next Greater Element II for each element in the circular array
function nextGreaterElementII(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];

    // Iterate twice to simulate circular behavior
    for (let i = 2 * n - 1; i >= 0; i--) {
        const current = nums[i % n];

        while (stack.length && stack[stack.length - 1] <= current) {
            stack.pop();
        }

        if (i < n) {
            result[i] = stack.length ? stack[stack.length - 1] : -1;
        }

        stack.push(current);
    }

    return result;
}

// Test cases
const testCases = [
    { input: [1, 2, 1], expected: [2, -1, 2] },
    { input: [3, 8, 4, 1, 2], expected: [8, -1, 8, 2, 3] },
    { input: [5, 4, 3, 2, 1], expected: [-1, 5, 5, 5, 5] },
    { input: [1, 2, 3, 4, 5], expected: [2, 3, 4, 5, -1] },
    { input: [7, 7, 7, 7], expected: [-1, -1, -1, -1] }, // All elements equal
    { input: [10], expected: [-1] },                    // Edge case: single element
    { input: [], expected: [] },                        // Edge case: empty array
    { input: [2, 1, 2, 4, 3], expected: [4, 2, 4, -1, 4] },
    { input: [9, 8, 7, 3, 2, 1, 10], expected: [10, 10, 10, 10, 10, 10, -1] },
    { input: [4, 3, 2, 1, 5], expected: [5, 5, 5, 5, -1] },
    { input : [-1,0] , expected: [0,-1]}
];

// Function to run tests
function runTests() {
    testCases.forEach((testCase, index) => {
        const result = nextGreaterElementII(testCase.input);
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
        console.log(`Test ${index + 1}: ${passed ? "✅ Passed" : "❌ Failed"}`);
        if (!passed) {
            console.log(`   Input: ${testCase.input}`);
            console.log(`   Expected: ${testCase.expected}, Got: ${result}`);
        }
    });
}

// Run the tests
runTests();




