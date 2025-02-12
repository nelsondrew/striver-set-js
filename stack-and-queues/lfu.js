function DllNode({ key, value, freq }) {
    this.key = key;
    this.value = value;
    this.freq = freq;
}

function DoublyLinkedList() {
    this.head = new DllNode({ key: null, value: null, freq: null });
    this.tail = new DllNode({ key: null, value: null, freq: null });
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.length = 0;
}

DoublyLinkedList.prototype.pushFromFront = function (node) {
    const nextoHeadNode = this.head.next;
    this.head.next = node;
    node.prev = this.head;
    nextoHeadNode.prev = node;
    node.next = nextoHeadNode;
    this.length++;
}

DoublyLinkedList.prototype.removeFromBack = function () {
    const lruNode = this.tail.prev;
    this.tail.prev = lruNode.prev;
    lruNode.prev.next = this.tail;
    this.length--;
    return lruNode;
}

DoublyLinkedList.prototype.remove = function (node) {
    const prevNode = node.prev;
    const nextNode = node.next;
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
    this.length--;
}

function LFUCache(capacity) {
    this.capacity = capacity;
    this.counter = new Map(); // frequency -> doubly linked list
    this.map = new Map();     // key -> DllNode
    this.minFreq = 0;
}

LFUCache.prototype.get = function (key) {
    if (this.map.has(key)) {
        const node = this.map.get(key);
        const currentFreq = node.freq;

        // Remove the node from the current frequency's doubly linked list
        this.counter.get(currentFreq).remove(node);

        // If the frequency list becomes empty, remove that frequency
        if (this.counter.get(currentFreq).length === 0) {
            this.counter.delete(currentFreq);
            if (currentFreq === this.minFreq) {
                this.minFreq++;
            }
        }

        // Increase the frequency and update the node
        node.freq++;

        // Add the node to the new frequency list
        if (!this.counter.has(node.freq)) {
            this.counter.set(node.freq, new DoublyLinkedList());
        }

        this.counter.get(node.freq).pushFromFront(node);

        return node.value;
    }
    return -1;  // Not found
};

LFUCache.prototype.put = function (key, value) {
    if (this.capacity === 0) return;

    if (this.map.has(key)) {
        // If the key exists, update its value and frequency
        const node = this.map.get(key);
        const currentFreq = node.freq;

        // Remove the node from the current frequency list
        this.counter.get(currentFreq).remove(node);

        // If the frequency list becomes empty, remove that frequency
        if (this.counter.get(currentFreq).length === 0) {
            this.counter.delete(currentFreq);
            if (currentFreq === this.minFreq) {
                this.minFreq++;
            }
        }

        // Update node's value and frequency
        node.value = value;
        node.freq++;

        // Add the node to the new frequency list
        if (!this.counter.has(node.freq)) {
            this.counter.set(node.freq, new DoublyLinkedList());
        }

        this.counter.get(node.freq).pushFromFront(node);
    } else {
        // If the key doesn't exist, we need to add it to the cache
        if (this.map.size === this.capacity) {
            // Evict the least frequently used (LFU) element
            const lfuDll = this.counter.get(this.minFreq);
            if (lfuDll && lfuDll.length > 0) {
                const lruNode = lfuDll.removeFromBack();
                this.map.delete(lruNode.key);

                // If the DLL for minFreq is now empty, remove that frequency from counter
                if (lfuDll.length === 0) {
                    this.counter.delete(this.minFreq);
                    // If no frequencies are left, reset minFreq
                    this.minFreq++;
                }
            }
        }

        // Create a new node and add it to the map and counter
        const newNode = new DllNode({ key, value, freq: 1 });
        if (!this.counter.has(newNode.freq)) {
            this.counter.set(newNode.freq, new DoublyLinkedList());
        }

        this.map.set(newNode.key, newNode);
        this.counter.get(newNode.freq).pushFromFront(newNode);

        // Update minFreq to the newly added node's frequency
        if (this.minFreq === 0 || newNode.freq < this.minFreq) {
            this.minFreq = newNode.freq;
        }
    }
};

