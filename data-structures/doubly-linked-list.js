function DllNode({key, value}) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
}

function DoublyLinkedList(){
    this.head= null;
    this.tail = null;
    this.length = 0;
}


DoublyLinkedList.prototype.append = function ({key, value}) {
    // we check if there's a head
    if(!this.head) {
        this.head = new DllNode({key, value});
        this.tail = this.head;
    } else {
        let newNode = new DllNode({key, value});
        this.tail.next= newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
    }
}

DoublyLinkedList.prototype.prepend = function ({key , value}) { 
    // we check if there's a head
    if(!this.head) {
        this.head = new DllNode({key , value});
        this.tail = this.head;
    } else {
        let newNode = new DllNode({key , value});
        this.head.prev = newNode;
        newNode.next = this.head;
        this.head = newNode;
    }
}

DoublyLinkedList.prototype.remove = function(key) {
    if(!this.head || !key) return ;
    let current = this.head;

    while(current) {
        if(current.key === key) {
            if(current.prev) {
                // if theres a previous node
                current.prev.next = current.next;
            } else {
               // that means its the head node
               this.head = current.next;
            }

            if(current.next) {
                // if theres a next node
                current.next.prev = current.prev;
            } else {
                // that means its the tail node
                this.tail = current.prev;
            }

            this.length--;
            return;
        }

        current = current.next;
    }
}

DoublyLinkedList.prototype.display = function() {
    let current = this.head;
    const elements = [];

    while(current) {
        elements.push(current.key);
        current = current.next;
    }

    console.log(elements.join("<->"))
}

DoublyLinkedList.prototype.size = function() {
    return this.length;
}

DoublyLinkedList.prototype.isEmpty = function() { 
    return this.length ===0;
}


// Test cases
const dllList = new DoublyLinkedList();

dllList.append({key: 1, value: 1});
dllList.append({key: 2, value: 2});
dllList.append({key: 3, value: 3});
dllList.display();
dllList.remove(2);
dllList.display();
dllList.prepend({key: 0, value: 0});
dllList.display();

// /// lru implementation 

function LRUCache(capacity) {
    this.capacity = capacity;
    this.cache = new DoublyLinkedList();
    this.map = new Map();
};

LRUCache.prototype.put = function(key,value) {
    // check if the key exists in the map
    if(this.map.has(key)) {
        // update the value in the map
        const node = this.map.get(key);
        node.value = value;
        // move the node to head to make it mru
        this.cache.remove(node.key);
        this.cache.prepend({ key, value: node.value });
    } else {
        const newNode = new DllNode({key, value});
        // check if the cache is full
        if(this.cache.size() >= this.capacity) {
            // remove the lru node
            const lruNode = this.cache.tail;
            this.cache.remove(lruNode.key);
            this.map.delete(lruNode.key);
        }
        // add it to map 
        this.map.set(key, newNode);
        // add it to cache to the head
        this.cache.prepend({ key, value: value });
    }
}

LRUCache.prototype.get = function(key) {
    if(this.map.has(key)) {
        const node = this.map.get(key);
        // move the node to head to make it mru
        this.cache.remove(node.key);
        this.cache.prepend({ key, value: node.value });
        return node.value;
    } else {
        return -1;
    }
}

LRUCache.prototype.display = function() {
    this.cache.display();
    console.log(this.map);
}

console.log("LRU Cache");

const lru = new LRUCache(3);
lru.put(1,1);
lru.display();
lru.put(1,3);
lru.display();