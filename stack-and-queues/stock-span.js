// It actually maintains a monotonous decreasing stack with memory
// the base rule for monotonous decreasing stack
// incoming element cannot be greater than top 
// if yes then start popping the stack
function StockSpanner() {
    this.stack = [];
}

StockSpanner.prototype.next = function(price) {
    let currentSpan = 1;
    while(this.stack.length && this.stack[this.stack.length-1][0] <= price) {
        const currentTop = this.stack[this.stack.length-1];
        currentSpan += currentTop[1];
        this.stack.pop();
    }
    this.stack.push([price , currentSpan]);
    return currentSpan;
}

// Test cases
const testCases = [
    { prices: [100, 80, 60, 70, 60, 75, 85], expected: [1, 1, 1, 2, 1, 4, 6] },
    { prices: [10, 20, 30, 40, 50], expected: [1, 2, 3, 4, 5] },       // Strictly increasing prices
    { prices: [50, 40, 30, 20, 10], expected: [1, 1, 1, 1, 1] },       // Strictly decreasing prices
    { prices: [100, 100, 100, 100], expected: [1, 2, 3, 4] },          // All prices equal
    { prices: [70, 80, 60, 90, 100, 50], expected: [1, 2, 1, 4, 5, 1] },
    { prices: [31, 41, 48, 59, 79], expected: [1, 2, 3, 4, 5] },       // Gradual increase
    { prices: [90, 85, 75, 80, 120, 110, 115], expected: [1, 1, 1, 2, 5, 1, 2] },
    { prices: [1], expected: [1] },                                   // Edge case: single element
    { prices: [], expected: [] },                                     // Edge case: empty array
    { prices: [60, 70, 80, 90, 100, 50, 40, 30, 20, 10], expected: [1, 2, 3, 4, 5, 1, 1, 1, 1, 1] }
];

// Test runner
function runTests() {
    testCases.forEach((testCase, index) => {
        const stockSpanner = new StockSpanner();
        const result = testCase.prices.map(price => stockSpanner.next(price));
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
        
        console.log(`Test ${index + 1}: ${passed ? "✅ Passed" : "❌ Failed"}`);
        if (!passed) {
            console.log(`   Input: ${testCase.prices}`);
            console.log(`   Expected: ${testCase.expected}, Got: ${result}`);
        }
    });
}

runTests()