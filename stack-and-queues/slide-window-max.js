var maxSlidingWindow = function(nums, k) {
    const deque = []; // Stores indices of potential max elements
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        // Remove indices of elements smaller than the current element
        // Maintain a monotonic increasing queue
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }

        // store only indices
        deque.push(i);

        // Remove indices that are out of the current window
        // we check the bottom of dequeue so see if they are out of current window
        while (deque[0] <= i - k) {
            deque.shift();
        }

        // Add the maximum element of the current window to the result
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    return result;
}
   