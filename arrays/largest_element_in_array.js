

function findLargestElement(arr) {
    if(!arr.length) return 0;
    if(arr.length === 1) return arr[0]
    let max = arr[0];
    for(let i = 1 ; i < arr.length ; i++) {
        if(arr[i] > max) {
            max = arr[i]
        }
    }
    return max;
}

// Test cases
const testCases = [
    { input: [3, 5, 7, 2, 8], expected: 8 },
    { input: [-10, -20, -5, -15], expected: -5 },
    { input: [100], expected: 100 },
    { input: [4, 4, 4, 4], expected: 4 },
    { input: [1, 9, 3, 7, 9, 2], expected: 9 },
    { input: [-1, -100, -50, -2], expected: -1 },
    { input: [0, -1, 1, 0], expected: 1 },
    { input: [99999, 88888, 77777, 100000], expected: 100000 },
    { input: [5, 5, 5, 5, 5], expected: 5 },
    { input: [-999999999, -1000000000, -999999998], expected: -999999998 },
];

// Function to run tests
function runTests() {
    testCases.forEach((testCase, index) => {
        const result = findLargestElement(testCase.input);
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
