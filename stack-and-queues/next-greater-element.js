// The intuition is light poles that a man can only see light poles in an increasing order
//  1 , 2 ,3,4, ,1,2 ,5
// Intermediate smaller elements must be removed
/// the next greater element uses the logic of monotonous decreasing stack 
// that means ascending order stack 
// which means the top of the stack will always be the next greater element
// as intermediate elements have been removed

// Function to find the Next Greater Element for each element in the array
function nextGreaterElement(arr) {
   const ngeStack = new Array(arr.length).fill(0);
   const stack = [];
   for(let i = arr.length -1; i > -1 ; i--) {
        while(stack.length && arr[i] >= stack[stack.length-1]) {
            stack.pop();
        }
        ngeStack[i] = stack[stack.length -1] || -1;
        stack.push(arr[i])
   }
   return ngeStack;
}

// Test cases
const testCases = [
    { input: [4, 5, 2, 10, 8], expected: [5, 10, 10, -1, -1] },
    { input: [1, 3, 2, 4], expected: [3, 4, 4, -1] },
    { input: [6, 8, 0, 1, 3], expected: [8, -1, 1, 3, -1] },
    { input: [9, 8, 7, 6, 5], expected: [-1, -1, -1, -1, -1] },
    { input: [1, 2, 3, 4, 5], expected: [2, 3, 4, 5, -1] },
    { input: [5, 4, 3, 2, 1], expected: [-1, -1, -1, -1, -1] },
    { input: [2], expected: [-1] }, // Edge case: single element
    { input: [], expected: [] },    // Edge case: empty array
    { input: [7, 7, 7, 7], expected: [-1, -1, -1, -1] }, // All elements equal
    { input: [3, 1, 2, 5, 4], expected: [5, 2, 5, -1, -1] }
];

// Function to run tests
function runTests() {
    testCases.forEach((testCase, index) => {
        const result = nextGreaterElement(testCase.input);
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

