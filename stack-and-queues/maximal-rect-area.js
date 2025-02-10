var largestRectangleArea = function (heights) {
    const n = heights.length;
    const pseStack = new Array(n).fill(-1);
    let stack = [];
    for (let i = 0; i < n; i++) {
        while (stack.length && stack[stack.length - 1][0] >= heights[i]) {
            stack.pop();
        }
        pseStack[i] = stack.length ? stack[stack.length - 1][1] : -1;
        stack.push([heights[i], i])
    }
    stack.length = 0;
    const nseStack = new Array(n).fill(n);
    for (let i = n - 1; i > -1; i--) {
        while (stack.length && stack[stack.length - 1][0] > heights[i]) {
            stack.pop();
        }
        nseStack[i] = stack.length ? stack[stack.length - 1][1] : n;
        stack.push([heights[i], i])
    }
    let maxArea = 0;
    for (let i = 0; i < n; i++) {
        const area = heights[i] * ((nseStack[i] - i) + (i - pseStack[i]) - 1);
        maxArea = Math.max(area, maxArea)
    }
    return maxArea;
}

var maximalRectangle = function (matrix) {
    const [ROWS, COLS] = [matrix.length, matrix[0].length];
    let maxArea = 0;
    const initialArr = new Array(COLS).fill(0)
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            const element = parseInt(matrix[i][j]);
            if (element === 0) {
                initialArr[j] = 0;
            } else if (element === 1) {
                initialArr[j] += 1;
            }
        }
        maxArea = Math.max(maxArea, largestRectangleArea(initialArr))

    }
    return maxArea;
}

// Test cases
const testCases = [
    { input: [["1"]], expected: 1 },                             // Single cell with '1'
    { input: [["0"]], expected: 0 },                             // Single cell with '0'
    { input: [["1", "0"], ["1", "0"]], expected: 2 },            // Vertical rectangle
    { input: [["1", "1"], ["1", "1"]], expected: 4 },            // Full 2x2 rectangle
    { input: [["0", "1"], ["1", "0"]], expected: 1 },            // No adjacent '1's forming a rectangle
    {
        input: [["1", "0", "1", "0", "0"],
        ["1", "0", "1", "1", "1"],
        ["1", "1", "1", "1", "1"],
        ["1", "0", "0", "1", "0"]], expected: 6
    },         // Large maximal rectangle
    { input: [["0", "0", "0"], ["0", "0", "0"]], expected: 0 },  // All zeros
    { input: [["1", "1", "1", "1"]], expected: 4 },              // Single row with all '1's
    { input: [["1"], ["1"], ["1"], ["1"]], expected: 4 },        // Single column with all '1's
    {
        input: [["1", "1", "0", "1"],
        ["1", "1", "0", "1"],
        ["0", "0", "1", "1"]], expected: 4
    },              // Two separate rectangles
    {
        input: [["1", "0", "1", "1", "1"],
        ["0", "1", "0", "1", "0"],
        ["1", "1", "1", "1", "1"],
        ["0", "1", "0", "1", "0"]], expected: 5
    },         // Complex structure with max rectangle in the middle
    { input: [["1", "1", "1"], ["1", "1", "1"], ["1", "1", "1"]], expected: 9 }, // Full 3x3 grid
    { input: [["0"]], expected: 0 },                             // Edge case: single '0' cell
    { input: [["1"]], expected: 1 },                             // Edge case: single '1' cell
    { input: [[]], expected: 0 },                                // Edge case: empty matrix
    { input: [["1", "0", "1", "1", "0", "1"]], expected: 2 },    // Single row with alternating '1's
    { input: [["1"], ["0"], ["1"], ["1"], ["0"], ["1"]], expected: 2 }, // Single column with interruptions
    { input: [["1", "1", "1", "0", "1", "1", "1"]], expected: 3 }, // Max rectangle before and after '0'
    {
        input: [["1", "0", "1", "0", "1"],
        ["0", "1", "0", "1", "0"],
        ["1", "0", "1", "0", "1"]], expected: 1
    },         // Sparse matrix with isolated '1's
    {
        input: [["1", "1", "0", "1", "1"],
        ["1", "1", "0", "1", "1"],
        ["0", "0", "0", "0", "0"],
        ["1", "1", "1", "1", "1"]], expected: 5
    }          // Bottom row full of '1's after gaps
];


// Function to run tests
function runTests() {
    testCases.forEach((testCase, index) => {
        const result = maximalRectangle(testCase.input);
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
