// Example function to find the second largest element (replace this with your implementation)
function findSecondLargestElement(arr) {
    const sortedArr = arr.sort((a, b) => a - b);
    let largest = sortedArr[sortedArr.length - 1];
    let secondLargest = null;
    let secondLastIndex = sortedArr.length - 1 - 1;
    while (secondLastIndex > -1) {
        if (arr[secondLastIndex] < largest) {
            secondLargest = arr[secondLastIndex];
            return secondLargest;
        }
        secondLastIndex -= 1;
    }
    return secondLargest;
}

function findLargest(arr) {
    if (!arr.length) return 0;
    if (arr.length === 1) return arr[0]
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    return max;
}

// Find second largest with first pass to find largest
// and in second pass use the largest element to find second largest
function findSecondLargestElementOnePass(arr) {
    const largest = findLargest(arr);
    let secondLargest = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > secondLargest && arr[i] !== largest) {
            secondLargest = arr[i]
        }
    }
    return secondLargest === -Infinity ? null : secondLargest;

}

function findSecondLargestOptimal(arr) {
    if (!arr.length) return 0;
    if (arr.length === 1) return null;
    let secondLargest = -Infinity;
    let largest = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > largest && arr[i] !== largest) {
            secondLargest = largest;
            largest = arr[i]
        } else if (arr[i] < largest && arr[i] !== largest && arr[i] > secondLargest) {
            secondLargest = arr[i]
        }
    }
    return secondLargest === -Infinity ? null : secondLargest;
}

// Test cases
const testCases = [
    { input: [3, 5, 7, 2, 8], expected: 7 },
    { input: [10, 10, 5, 5, 3], expected: 5 },
    { input: [100], expected: null }, // Only one element
    { input: [4, 4, 4, 4], expected: null }, // All elements are the same
    { input: [1, 9, 3, 7, 9, 2], expected: 7 },
    { input: [-1, -100, -50, -2], expected: -2 },
    { input: [0, -1, 1, 0], expected: 0 },
    { input: [99999, 88888, 77777, 100000], expected: 99999 },
    { input: [5, 5, 5, 5, 4], expected: 4 },
    { input: [-999999999, -1000000000, -999999998], expected: -999999999 },
];

// Function to run tests
function runTests() {
    testCases.forEach((testCase, index) => {
        const result = findSecondLargestOptimal(testCase.input);
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
