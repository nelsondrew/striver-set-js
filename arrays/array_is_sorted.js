
function isArraySorted(arr) {
    if(arr.length === 1 || !arr.length) return true;

    for(let i = 1 ; i < arr.length ; i++) {
        if(arr[i-1] > arr[i]) {
            return false;
        }
    }
    return true;
}

// Test cases
const testCases = [
    { input: [1, 2, 3, 4, 5], expected: true },
    { input: [5, 4, 3, 2, 1], expected: false },
    { input: [10], expected: true },
    { input: [7, 7, 7, 7], expected: true },
    { input: [1, 3, 2, 4, 5], expected: false },
    { input: [-3, -2, -1, 0], expected: true },
    { input: [0, 0, 1, 2, 3], expected: true },
    { input: [1, 2, 3, 2, 5], expected: false },
    { input: [], expected: true }, // Edge case: empty array
    { input: [100, 200, 300, 400, 500], expected: true },
];

// Function to run tests
function runTests() {
    testCases.forEach((testCase, index) => {
        const result = isArraySorted(testCase.input);
        const passed = result === testCase.expected;
        console.log(`Test ${index + 1}: ${passed ? "✅ Passed" : "❌ Failed"}`);
        if (!passed) {
            console.log(`   Input: ${testCase.input}`);
            console.log(`   Expected: ${testCase.expected}, Got: ${result}`);
        }
    });
}

// Run the tests
runTests();
