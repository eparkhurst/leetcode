import { ListNode, createList, readList } from './utils.mjs';

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
    i = k;
    let reversed = null;
    while (head) {
        const holder = { ...head };
        if (i == 0) {
        } else {
            holder.next = reversed;
            reversed = holder;
            head = head.next;
        }
        i--;
    }

    return reversed;
};

const input = createList([1, 2, 3, 4, 5]);
const nodeOutput = reverseKGroup(input, 2);

console.log(readList(nodeOutput));
