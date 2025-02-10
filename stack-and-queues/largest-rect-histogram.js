

var largestRectangleArea= function (heights) {
    const n = heights.length;
     const pseStack = new Array(n).fill(-1);
     let stack = [];
     for(let i = 0 ; i < n ; i++) {
         while(stack.length && stack[stack.length-1][0] >= heights[i]) {
             stack.pop();
         }
         pseStack[i] = stack.length ? stack[stack.length-1][1] : -1;
         stack.push([heights[i],i])
     }
     stack.length = 0;
     const nseStack = new Array(n).fill(n);
     for(let i = n-1 ; i > -1 ; i--) {
         while(stack.length && stack[stack.length-1][0] > heights[i]) {
             stack.pop();
         }
         nseStack[i] = stack.length ? stack[stack.length-1][1] : n;
         stack.push([heights[i],i])
     }
     let maxArea = 0;
     for(let i = 0 ; i < n; i++) {
         const area = heights[i] * ((nseStack[i] - i) + (i - pseStack[i]) - 1);
         maxArea = Math.max(area, maxArea)
     }
     return maxArea;
 }

const testCases = [
    { input: [2, 1, 5, 6, 2, 3], expected: 10 },              // Max rectangle in [5,6]
    { input: [2, 4], expected: 4 },                           // Simple two bars
    { input: [6, 2, 5, 4, 5, 1, 6], expected: 12 },           // Classic test case
    { input: [1, 1, 1, 1], expected: 4 },                     // Uniform heights
    { input: [4, 3, 2, 1], expected: 6 },                     // Decreasing heights
    { input: [1, 2, 3, 4, 5], expected: 9 },                  // Increasing heights
    { input: [5], expected: 5 },                             // Edge case: single bar
    { input: [], expected: 0 },                              // Edge case: empty array
    { input: [0, 0, 0, 0], expected: 0 },                     // All zeros
    { input: [2, 1, 2], expected: 3 },                        // Small peak in the middle
    { input: [1000, 1000, 1000, 1000], expected: 4000 },     // Large uniform heights
    { input: [1, 2, 3, 4, 5, 4, 3, 2, 1], expected: 15 },     // Symmetrical mountain shape
    { input: [1, 3, 2, 1, 2], expected: 5 },                  // Peaks and valleys
    { input: [2, 1, 4, 5, 1, 3, 3], expected: 8 },            // Multiple local maxima
    { input: [5, 4, 3, 2, 1, 2, 3, 4, 5], expected: 9 },      // Valley in the middle
    { input: [1, 2, 2, 2, 1], expected: 6 },                  // Plateau in the middle
    { input: [3, 6, 5, 7, 4, 8, 1, 0], expected: 20 },        // Complex pattern
    { input: [0, 1, 2, 3, 4, 5, 6], expected: 12 },           // Starts with zero
    { input: [6, 5, 4, 3, 2, 1, 0], expected: 12 },           // Ends with zero
    { input: [1, 0, 1, 0, 1], expected: 1 }                   // Alternating zeros
];

// Function to run tests
function runTests() {
    testCases.forEach((testCase, index) => {
        const result = largestRectangleArea(testCase.input);
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
