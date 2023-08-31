function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

const list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));

var removeNthFromEnd = function (head, n) {
    let length = 0;
    let node = head;
    let prev = null;
    while (node) {
        length++;
        node = node.next;
    }
    length -= n;
    node = head;
    while (length > 0) {
        length--;
        prev = node;
        node = node.next;
    }
    if (prev) {
        prev.next = node.next;
    }
    return prev ? head : head.next;
};

console.log(removeNthFromEnd(list, 2));
console.log(removeNthFromEnd([1], 1));
