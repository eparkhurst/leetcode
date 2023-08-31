import { readList } from './utils.mjs';

function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

const list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
const list2 = new ListNode(1, new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6, new ListNode(7))))));
/**
 *
 *
 *
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
    let node1 = list1;
    let node2 = list2;
    let finalList = new ListNode();
    let currentNode = finalList;
    while (!!node1 && !!node2) {
        if (!!node1 && (node1.val <= node2.val || !node2)) {
            currentNode.next = node1;
            node1 = node1.next;
        } else {
            currentNode.next = node2;
            node2 = node2.next;
        }
        currentNode = currentNode.next;
    }
    if (!!node1) {
        currentNode.next = node1;
    }
    if (!!node2) {
        currentNode.next = node2;
    }
    return finalList.next;
};

const nodes = mergeTwoLists(list, list2);
console.log(readList(nodes));
