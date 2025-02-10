var solution = function(knows) {
    /**
     * @param {integer} n Total people
     * @return {integer} The celebrity
     */
        function isCelebrity(m,n) {
            // every person must know the celebrity
            for(let i = 0 ; i < n; i++) {
                if(i === m) {
                    // do not run the validation for self
                    continue;
                }
                // if a person doesnt know m .... then m is not the celebrity
                // if m knows some other person ... then again m is not the celebrity
                if((!knows(i,m)) || (knows(m,i))) {
                    return false;
                }
            }
            return true;
        }
    return function(n) {
        // consider first element as the celebrity 
        for(let i = 0 ; i < n; i++) {
            if(isCelebrity(i,n)) {
                return i;
            }
        }
        return -1;
    };
};

// Second solution which is based on potential candidate
var solution2 = function (knows) {
    /**
     * @param {integer} n Total people
     * @return {integer} The celebrity
     */
    return function (n) {
        // Think of 0 as a potential celebrity
        let candidate = 0;
        for (let i = 1; i < n; i++) {
            if (knows(candidate, i)) {
                // if candidate knows someone , then it cant be the candidate
                // update the candidate
                candidate = i;
            }
        }

        // Now with potential candidate , do the row col check for the candidate
        for (let i = 0; i < n; i++) {

            if (i !== candidate && (knows(candidate, i) || !knows(i, candidate))) {
                return -1;
            }
        }
        return candidate;
    };
};

// Mock "knows" function generator
function createKnowsMatrix(matrix) {
    return function(a, b) {
        return matrix[a][b] === 1;
    };
}

// Test framework
function runTests() {
    const tests = [
        {
            description: "Test Case 1: Celebrity exists (Person 2)",
            matrix: [
                [0, 1, 1],  // Person 0 knows 1 and 2
                [0, 0, 1],  // Person 1 knows 2
                [0, 0, 0],  // Person 2 knows no one
            ],
            expected: 2
        },
        {
            description: "Test Case 2: No celebrity exists",
            matrix: [
                [0, 1, 0],
                [0, 0, 1],
                [1, 0, 0],
            ],
            expected: -1
        },
        {
            description: "Test Case 3: Single person (Person 0 is the celebrity)",
            matrix: [
                [0]
            ],
            expected: 0
        },
        {
            description: "Test Case 4: Celebrity is Person 0",
            matrix: [
                [0, 0, 0, 0],
                [1, 0, 1, 1],
                [1, 1, 0, 1],
                [1, 1, 1, 0],
            ],
            expected: 0
        },
        {
            description: "Test Case 5: All know each other, no celebrity",
            matrix: [
                [0, 1, 1],
                [1, 0, 1],
                [1, 1, 0],
            ],
            expected: -1
        }
    ];

    tests.forEach(({ description, matrix, expected }, index) => {
        const knows = createKnowsMatrix(matrix);
        const findCelebrity = solution(knows);
        const result = findCelebrity(matrix.length);

        console.log(`${description}: ${result === expected ? "✅ Passed" : `❌ Failed (Expected: ${expected}, Got: ${result})`}`);
    });
}

runTests();
