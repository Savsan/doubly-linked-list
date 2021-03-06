const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        var newNode = new Node(data);
        var tail = this._tail;
        if(this.isEmpty()){
            this._head = newNode;
            this._tail = newNode;
            this.length++;
            return this;
        }

        newNode.index = tail.index + 1;
        tail.next = newNode;
        tail.next.prev = tail;
        this._tail = tail.next;
        this.length++;
        return this;
    }

    head() {
        return this._head === null ? this._head : this._head.data;
    }

    tail() {
        return this._tail === null ? this._tail : this._tail.data;
    }

    at(index) {
        if(!this.isEmpty()) {
            // Call shortSearch method to get node by shorter way
            var node = this.shortSearch(index);
            // Return data if node was found
            if(node != null){
                return node.data;
            }
        }
    }

    insertAt(index, data) {
        // Create new node
        var newNode = new Node(data);
        // Call shortSearch method to get node by shorter way
        var node = this.shortSearch(index);
        // Insert new node if passed index exist.
        if(node != null){
            if(node === this._head){
                newNode.next = node;
                node.prev = newNode;
                this._head = newNode;
            }else{
                newNode.next = node;
                newNode.index = node.index;
                newNode.prev = node.prev;
                node.prev.next = newNode;
                node.prev = newNode;
            }
            // Rewrite indexes of list to keep it in correct state
            while(node != null){
                node.index++;
                node = node.next;
            }
            this.length++;
        }
        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        if(this.isEmpty()){
            return 'There is nothing to delete. List is empty.';
        }

        // Call shortSearch method to get node by shorter way
        var node = this.shortSearch(index);

        // Throw an error if there is no node with such index.
        if(node === null){
            throw `No node with index: ${index}.`;
        }

        // Delete node from list
        if(node === this._head && node === this._tail){
            this._head = null;
            this._tail = null;
        }else if(node === this._head && node.next != null){
            node.next.prev = null;
            this._head = node.next;
        }else if(node.prev != null && node.next === null){
            node.prev.next = null;
            this._tail = node.prev;
        }else if(node.prev != null && node.next != null){
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
        this.length--;

        // Rewrite indexes of list to keep it in correct state
        while(node.next != null){
            node.next.index--;
            node = node.next;
        }

        return this;
    }

    reverse() {
        if(this._head.next === null){
            return this;
        }

        var current = this._head;
        var lastIndex = this._tail.index;
        var temp;

        while(current != null){
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            if(this.length > 0){
                current.index = lastIndex--;
            }
            if(current.prev === null){
                this._head = current;
            }
            if(current.next === null){
                this._tail = current;
            }
            current = current.prev;
        }
        return this;
    }

    indexOf(data) {
        var node = this._head;
        while(node != null){
            if(node.data === data){
                return node.index;
            }
            node = node.next
        }
        return -1;
    }

    /**
     * Find Node by index
     * @param index
     * @returns {Node} or {null}
     */
    shortSearch(index) {
        var node = null;
        var midIndex = Math.floor((this.length - 1) / 2);

        if(index <= midIndex){
            node = this._head;
            while(node != null){
                if(node.index === index){
                    break;
                }
                node = node.next;
            }
        }else if(index > midIndex){
            node = this._tail;
            while(node != null){
                if(node.index === index){
                    break;
                }
                node = node.prev;
            }
        }
        return node;
    }
}

module.exports = LinkedList;
