import { createList, ListNode, readList } from './utils.mjs';

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    if (!lists.length) return null;
    for (let i = 1; i < lists.length; i++) {
        lists[0] = merge(lists[0], lists[i]);
    }
    return lists[0];
};

const merge = (l1, l2) => {
    if (!l1) return l2;
    if (!l2) return l1;

    if (l1.val < l2.val) {
        l1.next = merge(l1.next, l2);
        return l1;
    } else {
        l2.next = merge(l2.next, l1);
        return l2;
    }
};

const input = [createList([1, 4, 5]), createList([1, 3, 4]), createList([2, 6])];
const ans = mergeKLists(input);
console.log(readList(ans));
