function subArrayMins(nums) {
    // pse , nse
    const n = nums.length;
    let stack= [];
    const pseStack = new Array(n).fill(-1);
    for(let i = 0 ; i < n ; i++) {
        // arr[i] > stack[stack.length-1]
        while(stack.length && nums[i] <= stack[stack.length-1][0]) {
            stack.pop();
        }
        pseStack[i] = stack.length ? stack[stack.length-1][1] : -1;
        stack.push([nums[i],i])
    }
    stack.length= 0;
    const nseStack = new Array(n).fill(n);
    for(let i = n-1; i > -1 ; i--) {
        // nums[i] > stack[stack.length-1]
        while(stack.length && nums[i] < stack[stack.length-1][0]) {
            stack.pop();
        }
        nseStack[i] = stack.length ? stack[stack.length-1][1] : n;
        stack.push([nums[i] , i])
    }
    let result = 0;
    for(let i = 0 ; i < n ; i++) {
        const left = i - pseStack[i];
        const right = nseStack[i] - i ;
        result += (nums[i] * left * right);
    }
    return result;

}

function subArrayMaxs(nums) {
    // pse , nse
    const n = nums.length;
    let stack= [];
    const pgeStack = new Array(n).fill(-1);
    for(let i = 0 ; i < n ; i++) {
        // arr[i] < stack[stack.length-1]
        while(stack.length && nums[i] >= stack[stack.length-1][0]) {
            stack.pop();
        }
        pgeStack[i] = stack.length ? stack[stack.length-1][1] : -1;
        stack.push([nums[i],i])
    }
    stack.length= 0;
    const ngeStack = new Array(n).fill(n);
    for(let i = n-1; i > -1 ; i--) {
        // nums[i] < stack[stack.length-1]
        while(stack.length && nums[i] > stack[stack.length-1][0]) {
            stack.pop();
        }
        ngeStack[i] = stack.length ? stack[stack.length-1][1] : n;
        stack.push([nums[i] , i])
    }
    let result = 0;
    for(let i = 0 ; i < n ; i++) {
        const left = i - pgeStack[i];
        const right = ngeStack[i] - i ;
        result += (nums[i] * left * right);
    }
    return result;
}

var subArrayRanges = function(nums) {
   const max=  subArrayMaxs(nums);
   const min = subArrayMins(nums);
   const diff = max - min;
   return diff;
};

// Test cases
const testCases = [
    { input: [1, 2, 3], expected: 4 },               // Simple increasing sequence
    { input: [4, 1, 3, 2], expected: 14 },            // Random elements
    { input: [1, 3, 3], expected: 4 },               // Duplicates
    { input: [5, 5, 5, 5], expected: 0 },            // All elements are the same
    { input: [10], expected: 0 },                   // Single element
    { input: [2, 1, 4, 3], expected: 14 },            // Alternating high-low
    { input: [1, 2, 3, 4, 5], expected: 20 },        // Strictly increasing
    { input: [5, 4, 3, 2, 1], expected: 20 },        // Strictly decreasing
    { input: [1, 1, 1, 1], expected: 0 },            // All equal elements
    { input: [-1, 0, 1], expected: 4 },              // Includes negative numbers
    { input: [], expected: 0 },                     // Edge case: empty array
    { input: [9, 8, 7, 3, 2, 1, 10], expected: 116 }, // Mixed sequence
    { input: [4, 3, 2, 1, 5], expected: 26 }         // Decreasing then spike
];

// Function to run tests
function runTests() {
    testCases.forEach((testCase, index) => {
        const result = subArrayRanges(testCase.input);
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
