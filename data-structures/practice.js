function DllNode(key, value) {
    this.prev = null;
    this.next = null;
    this.key = key;
    this.value = value;
}

function LRUCache(capacity) {
    this.capacity = capacity;
    this.head = new DllNode({ key: null, value: null });
    this.tail = new DllNode({ key: null, value: null });
    this.size = 0;
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.map = new Map();
}


LRUCache.prototype.addNode = function (node) {
    // always add to front
    const nextToHeadNode = this.head.next;
    nextToHeadNode.prev = node;
    node.next = nextToHeadNode;
    this.head.next = node;
    node.prev = this.head;
}

LRUCache.prototype.removeNode = function (node) {
    node.next.prev = node.prev;
    node.prev.next = node.next;
}

LRUCache.prototype.get = function (key) {
    if (this.map.has(key)) {
        const node = this.map.get(key);
        // move to front logic
        this.removeNode(node);
        this.addNode(node);
        return node.value;
    }
    return -1;
}

LRUCache.prototype.put = function (key, value) {
    // if the map already has it then update it and return the updated value
    // and move it to the front
    if (this.map.has(key)) {
        const node = this.map.get(key);
        // move to front logic
        node.value = value;
        this.removeNode(node);
        this.addNode(node);
    } else {
        // create new node
        const newNode = new DllNode({key , value});
        this.map.set(key, newNode);
        this.addNode(node);
        this.size++;

        if(this.size > this.capacity) {
            const lruNode = this.tail.prev;
            this.removeNode(lruNode);
            this.map.delete(lruNode.key)
            this.size--;
        }
    }
}