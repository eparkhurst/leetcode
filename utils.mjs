export function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

export const readList = (list) => {
    let node = list;
    let arr = [];
    while (!!node) {
        arr.push(node.val);
        node = node.next;
    }
    return arr;
};

export const createList = (arr) => {
    let list = new ListNode();
    let node = list;
    for (let i = 0; i < arr.length; i++) {
        node.next = new ListNode(arr[i]);
        node = node.next;
    }
    return list.next;
};
