import { ListNode, createList, readList } from './utils.mjs';

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
    if (!head || !head.next) return head;
    const tail = swapPairs(head.next.next);
    const newFirst = head.next;
    newFirst.next = head;
    newFirst.next.next = tail;
    return newFirst;
};

const input = createList([1, 2, 3, 4, 5, 6]);
const nodeAns = swapPairs(input);

console.log(readList(nodeAns));
