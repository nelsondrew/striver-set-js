    // Function to calculate trapped rain water
    function trap(height) {
        let [prefix, suffix] = [new Array(height.length), new Array(height.length)];
        let [leftMax, rightMax] = [0, 0];
        for (let i = 0; i < height.length; i++) {
            prefix[i] = leftMax;
            leftMax = Math.max(leftMax, height[i]);
            suffix[height.length - 1 - i] = rightMax;
            rightMax = Math.max(rightMax, height[height.length - 1 - i])
        }
        let trappedWater = 0;
        for (let i = 0; i < height.length - 1; i++) {
            const waterHeld = Math.min(prefix[i], suffix[i]) - height[i];

            if (waterHeld > 0) {
                trappedWater += waterHeld;
            }
        }
        return trappedWater;
    }

// Test cases
const testCases = [
    { input: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], expected: 6 },
    { input: [4, 2, 0, 3, 2, 5], expected: 9 },
    { input: [1, 0, 2, 0, 3, 0, 4], expected: 6 },
    { input: [3, 0, 0, 2, 0, 4], expected: 10 },
    { input: [0, 0, 0, 0], expected: 0 },               // Edge case: all zeros
    { input: [1, 1, 1, 1], expected: 0 },               // Edge case: flat surface
    { input: [2], expected: 0 },                     // Edge case: single element
    { input: [], expected: 0 },                      // Edge case: empty array
    { input: [5, 4, 3, 2, 1], expected: 0 },             // Decreasing sequence
    { input: [1, 2, 3, 4, 5], expected: 0 }              // Increasing sequence
];

// Function to run tests
function runTests() {
    testCases.forEach((testCase, index) => {
        const result = trap(testCase.input);
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