function sumOfSubArrayMins(arr) {
    const n = arr.length;
    let stack = [];
    // pse
    const pseStack = new Array(n).fill(-1);
    for(let i = 0 ; i < n; i++) {
        // 1, 2,3 ,4 ,1, 2, 
        while(stack.length && arr[i] < stack[stack.length-1][0]) {
            stack.pop();
        }
        pseStack[i] = stack.length ? stack[stack.length-1][1] : -1;
        stack.push([arr[i] , i])
    }
    stack.length = 0
    // nse
    const nseStack = new Array(n).fill(n);
    for(let i = n-1; i > -1 ; i--) {
        // 4,3,2,5
        while(stack.length && arr[i] <= stack[stack.length-1][0]) {
            stack.pop();
        }
        nseStack[i] = stack.length ? stack[stack.length-1][1] : n;
        stack.push([arr[i] , i])
    }

    let result = 0 ;
    const MOD = 1e9 + 7
    for(let i = 0 ; i < n ; i++) {
        const left = i - pseStack[i];
        const right = nseStack[i] - i;
        result = (result + (arr[i] * left * right) % MOD) % MOD;
    }
    return result;
}



// Test cases
const testCases = [
    { input: [3, 1, 2, 4], expected: 17 },      // Subarrays: [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4]
    { input: [11, 81, 94, 43, 3], expected: 444 },
    { input: [1, 1, 1, 1], expected: 10 },       // All elements are equal
    { input: [5, 4, 3, 2, 1], expected: 35 },    // Strictly decreasing
    { input: [1, 2, 3, 4, 5], expected: 35 },    // Strictly increasing
    { input: [10], expected: 10 },              // Single element
    { input: [], expected: 0 },                 // Edge case: empty array
    { input: [2, 1, 2, 4, 3], expected: 26 },
    { input: [9, 8, 7, 3, 2, 1, 10], expected: 90 },
    { input: [4, 3, 2, 1, 5], expected: 29 },
    { input: [-1, 0], expected: -2 }            // Contains negative numbers
];

// Function to run tests
function runTests() {
    testCases.forEach((testCase, index) => {
        const result = sumOfSubArrayMins(testCase.input);
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
