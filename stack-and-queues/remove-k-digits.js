/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function (nums, k) {
    let stack = [];

    for (let i = 0; i < nums.length; i++) {
        const currentNum = parseInt(nums[i]);

        while (stack.length && k > 0 && stack[stack.length - 1] > currentNum) {
            k--;
            stack.pop();
        }

        stack.push(currentNum);
    }

    while(k > 0) {
        k--;
        stack.pop();
    }
    stack = stack.join('').replace(/^0+/,'');
    return stack.length ? stack : '0';
}

// Test cases
const testCases = [
    { num: "1432219", k: 3, expected: "1219" },    // Remove 4, 3, 2 to get 1219
    { num: "10200", k: 1, expected: "200" },       // Remove 1 to get 0200 => 200
    { num: "10", k: 2, expected: "0" },            // Remove both digits => 0
    { num: "1234567890", k: 9, expected: "0" },    // Remove first 9 digits => 0
    { num: "9", k: 1, expected: "0" },             // Single digit removed => 0
    { num: "1111111", k: 3, expected: "1111" },    // All digits are the same
    { num: "10001", k: 1, expected: "1" },         // Remove 1 => 0001 => 1, but better to remove 0 => 000 => 0
    { num: "7654321", k: 3, expected: "4321" },    // Remove largest digits from the start
    { num: "12345", k: 0, expected: "12345" },     // Edge case: k = 0, no removal
    { num: "100", k: 1, expected: "0" },           // Remove 1, leading zeros handled
    { num: "1173", k: 2, expected: "11" },         // Remove 7 and 3 to get 11
    { num: "5337", k: 2, expected: "33" },         // Remove 5 and 7 to get 33
    { num: "0", k: 0, expected: "0" },             // Edge case: zero remains zero
    { num: "", k: 0, expected: "0" },               // Edge case: empty string
];

// Function to run tests
function runTests() {
    testCases.forEach((testCase, index) => {
        const result = removeKdigits(testCase.num, testCase.k);
        const passed = result === testCase.expected;
        console.log(`Test ${index + 1}: ${passed ? "✅ Passed" : "❌ Failed"}`);
        if (!passed) {
            console.log(`   Input: num = "${testCase.num}", k = ${testCase.k}`);
            console.log(`   Expected: "${testCase.expected}", Got: "${result}"`);
        }
    });
}

// Run the tests
runTests();
