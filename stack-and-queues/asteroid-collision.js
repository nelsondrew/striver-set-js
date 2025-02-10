/**
 * @param {number[]} asteroids
 * @return {number[]}
 */



var asteroidCollision = function (asteroids) {
    const stack = [];
    for(const ast of asteroids) {
      let destroyed = false;
      while(stack.length > 0 && stack[stack.length -1] > 0 && ast < 0) {
          const diff = ast + stack[stack.length -1];
          if(diff > 0) {
              // top element won
              // asteroid destroyed
              destroyed= true;
              break;
          } else if (diff < 0) {
              // asteroid won
              stack.pop();
          } else if (diff === 0) {
              // both cancelled out
              destroyed = true;
              stack.pop();
              break;
          }
      }
      if(!destroyed) {
          stack.push(ast);
      }
    }
    return stack;
  };


  // Test cases
const testCases = [
    { input: [5, 10, -5], expected: [5, 10] },                 // Asteroid -5 destroyed
    { input: [8, -8], expected: [] },                         // Both destroyed
    { input: [10, 2, -5], expected: [10] },                   // 2 and -5 collide, -5 destroyed
    { input: [-2, -1, 1, 2], expected: [-2, -1, 1, 2] },      // No collisions
    { input: [1, -1, -2, -2], expected: [-2, -2] },           // 1 and -1 cancel, left with -2, -2
    { input: [2, -2, 1, -1], expected: [] },                  // All cancel out
    { input: [1, 2, 3, -3, -2, -1], expected: [] },           // Perfect chain cancellation
    { input: [1, -2, 2, -1], expected: [-2, 2] },             // Cross collisions
    { input: [10, -5, -15], expected: [-15] },                // Big asteroid at the end survives
    { input: [3, 2, -5], expected: [-5] },                    // Smaller ones destroyed by -5
    { input: [], expected: [] },                             // Edge case: empty array
    { input: [1], expected: [1] },                           // Edge case: single asteroid
    { input: [-1], expected: [-1] },                         // Edge case: single negative asteroid
    { input: [4, 3, -2, -5], expected: [-5] },               // Multiple collisions
    { input: [5, -5, 6, -6, 7, -7], expected: [] },          // All pairs cancel
    { input: [1, -2, -2, -2], expected: [-2, -2, -2] },       // Repeated negative asteroids
    { input: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] },    // No negative asteroids
    { input: [-1, -2, -3, -4, -5], expected: [-1, -2, -3, -4, -5] }, // No positive asteroids
    { input: [3, -1, -2, -3], expected: [] },               // Positive asteroid eventually destroyed
    { input: [5, -10, 5], expected: [-10,5] }                    // Middle asteroid dominates
];

// Function to run tests
function runTests() {
    testCases.forEach((testCase, index) => {
        const result = asteroidCollision(testCase.input);
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
