// Function to find the Previous Smaller Element for each element in the array
function previousSmallerElement(arr) {
    const pse = new Array(arr.length).fill(0);
    const stack = [];
    for (let i = 0; i < arr.length; i++) {
        while (stack.length && stack[stack.length - 1] >= arr[i]) {
            stack.pop();
        }

        pse[i] = stack.length ? stack[stack.length - 1] : -1;
        stack.push(arr[i])
    }

    return pse;
}

// Test cases
const testCases = [
    { input: [4, 5, 2, 10, 8], expected: [-1, 4, -1, 2, 2] },
    { input: [1, 3, 2, 4], expected: [-1, 1, 1, 2] },
    { input: [6, 8, 0, 1, 3], expected: [-1, 6, -1, 0, 1] },
    { input: [9, 8, 7, 6, 5], expected: [-1, -1, -1, -1, -1] },
    { input: [1, 2, 3, 4, 5], expected: [-1, 1, 2, 3, 4] },
    { input: [5, 4, 3, 2, 1], expected: [-1, -1, -1, -1, -1] },
    { input: [2], expected: [-1] }, // Edge case: single element
    { input: [], expected: [] },    // Edge case: empty array
    { input: [7, 7, 7, 7], expected: [-1, -1, -1, -1] }, // All elements equal
    { input: [3, 1, 2, 5, 4], expected: [-1, -1, 1, 2, 2] }
];

// Function to run tests
function runTests() {
    testCases.forEach((testCase, index) => {
        const result = previousSmallerElement(testCase.input);
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
