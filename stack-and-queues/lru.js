function DllNode({ key, value }) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
}

function LRUCache(capacity) {
    this.capacity = capacity;
    this.map = new Map();  // Map for O(1) access to nodes
    this.head = new DllNode({ key: null, value: null });  // Dummy head
    this.tail = new DllNode({ key: null, value: null });  // Dummy tail
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
}

// Helper method to remove a node from the doubly linked list
LRUCache.prototype._removeNode = function(node) {
    // break link of the node prev and next
    node.prev.next = node.next;
    node.next.prev = node.prev;
};

// Helper method to add a node right after the head (making it the most recently used)
LRUCache.prototype._addNode = function(node) {
    // 1
    // h - t
    // 1 -> t
    // h <- 1 -> t
    // h <-1 <-> t
    // h <->1 <-> t
    // form 2 links with dummy head
    // form 2 links with head's next
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
};

// Get method: O(1)
LRUCache.prototype.get = function(key) {
    if (this.map.has(key)) {
        const node = this.map.get(key);
        this._removeNode(node);
        this._addNode(node);  // Move to front (most recently used)
        return node.value;
    }
    return -1;
};

// Put method: O(1)
LRUCache.prototype.put = function(key, value) {
    if (this.map.has(key)) {
        const node = this.map.get(key);
        node.value = value;
        this._removeNode(node);
        this._addNode(node);  // Move to front (most recently used)
    } else {
        const newNode = new DllNode({ key, value });
        this.map.set(key, newNode);
        this._addNode(newNode);

        this.size++;

        // If the cache exceeds the capacity, remove the least recently used node (from tail)
        if (this.size > this.capacity) {
            const lruNode = this.tail.prev;
            this._removeNode(lruNode);
            this.map.delete(lruNode.key);
            this.size--;
        }
    }
};
